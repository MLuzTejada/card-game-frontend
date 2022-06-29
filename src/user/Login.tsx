import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormPassword from "../common/components/FormPassword"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import "../styles.css"
import { login } from "./userService"

export default function Login() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations()
        if (!userName) {
            errorHandler.addError("userName", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await login({
                username: userName,
                password
            })
            navigate("/menu")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Iniciar Sesion</FormTitle>

            <Form>
                <FormInput
                    label="Usuario"
                    name="login"
                    errorHandler={errorHandler}
                    onChange={(event) => setUserName(event.target.value)} />

                <FormPassword
                    label="Contraseña"
                    name="password"
                    errorHandler={errorHandler}
                    onChange={(event) => setPassword(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Iniciar sesion" onClick={loginClick} />
                </FormButtonBar><br></br>
                <text>¿No estas registrado?</text><NavLink to="/newUser"><button className="btn info">Registrate</button></NavLink>
            </Form >
        </GlobalContent >
    )
}
