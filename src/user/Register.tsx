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
import { newUser } from "./userService"

export default function Register() {
  const navigate = useNavigate()
  const [userName, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const errorHandler = useErrorHandler()

  const registerClick = async () => {
    errorHandler.cleanRestValidations()
    if (!userName) {
      errorHandler.addError("login", "No puede estar vacío")
    }
    if (!password) {
      errorHandler.addError("password", "No puede estar vacío")
    }
    if (password !== password2) {
      errorHandler.addError("password2", "Las contraseñas no coinciden")
    }

    if (errorHandler.hasErrors()) {
      return
    }

    try {
      await newUser({
        username: userName,
        password,
      })
      navigate("/")
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  return (
    <GlobalContent>
      <FormTitle>Registrarse</FormTitle>

      <Form>
        <FormInput
          label="Nombre de usuario"
          name="userName"
          value={userName}
          errorHandler={errorHandler}
          onChange={(e) => setLogin(e.target.value)}
        />

        <FormPassword
          label="Contraseña"
          name="password"
          value={password}
          errorHandler={errorHandler}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormPassword
          label="Repetir contraseña"
          name="password2"
          value={password2}
          errorHandler={errorHandler}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <DangerLabel message={errorHandler.errorMessage} />

        <FormButtonBar>
          <FormAcceptButton label="Registrarse" onClick={registerClick} />
        </FormButtonBar><br></br>
        <text>¿Ya estas registrado?</text><NavLink to="/"><button className="btn info">Inicia sesión</button></NavLink>
      </Form>
    </GlobalContent>
  )
}
