import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorLabel from "../common/components/ErrorLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormTitle from "../common/components/FormTitle"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useSessionUser } from "../store/userStore"
import "../styles.css"
import {
  getCurrentProfile,
  updateBasicInfo
} from "./profileService"

export default function Profile() {
  const user = useSessionUser()
  const history = useNavigate()
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")

  const errorHandler = useErrorHandler()

  const loadProfile = async () => {
    try {
      const result = await getCurrentProfile()
      console.log("profile: ", result)

      setEmail(result.email)
      setUsername(result.username)
      setPhone(result.phone)
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  const updateClick = async () => {
    errorHandler.cleanRestValidations()
    if (!username) {
      errorHandler.addError("name", "No puede estar vacío")
    }
    if (!email) {
      errorHandler.addError("email", "No puede estar vacío")
    }
    if (errorHandler.hasErrors()) {
      return
    }

    try {
      if (user) {
        await updateBasicInfo({
          email,
          username,
          phone
        }, user.id)
        history("/menu")
      } else {
        errorHandler.addError("user", "Debe iniciar sesión")
      }
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  useEffect(() => {
    void loadProfile()
  }, [])

  return (
    <div>
      <FormTitle>Actualizar Perfil</FormTitle>

      <Form>
        <FormInput
          label="Nombre de usuario"
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          errorHandler={errorHandler}
        />

        <FormInput
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorHandler={errorHandler}
        />

        <div className="form-group">
          <ErrorLabel message={errorHandler.getErrorText("user")} />
        </div>

        <FormInput
          label="Teléfono"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          errorHandler={errorHandler}
        />

        <FormButtonBar>
          <FormAcceptButton label="Actualizar" onClick={updateClick} />
          <FormButton label="Cancelar" onClick={() => history("/")} />
        </FormButtonBar>
      </Form>
    </div>
  )
}
