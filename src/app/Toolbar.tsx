/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react"
import "./Toolbar.css"
import { useSessionUser } from "../store/userStore"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../user/userService"
import { AiOutlineUser, AiFillEdit, AiOutlineMenu } from "react-icons/ai"
import { MdLogout } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"

export default function Toolbar() {
  const user = useSessionUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      if (user) {
        await logout(user.id)
        navigate("/")
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex shadow">
      <div className="container-fluid">
        <div className="toolbar_icon">
          <img src="/assets/logo.png" width='50px' />
        </div>
        <NavLink to="/menu">
          <a className="toolbar_title flex-grow-1">
            {user ? <AiOutlineMenu /> : ""}
            {user ? "Menu" : ""}
          </a>
        </NavLink>
        <NavLink to="/profile">
          <a className="toolbar_title flex-grow-1">
            {user ? <AiFillEdit /> : ""}
            {user ? "Editar perfil" : ""}
          </a>
        </NavLink>
        <NavLink to="/password">
          <a className="toolbar_title flex-grow-1">
            {user ? <RiLockPasswordLine /> : ""}
            {user ? "Cambiar contraseña" : ""}
          </a>
        </NavLink>
        <NavLink to="/info">
          <a className="toolbar_title navbar-brand flex-grow-1">
            {user ? <AiOutlineUser /> : ""}
            {user ? user.username : ""}
          </a>
        </NavLink>
        <a className="toolbar_title d-flex" onClick={handleLogout}>
          {user ? <MdLogout /> : ""}
          {user ? "Cerrar sesión" : ""}
        </a>
      </div>
    </nav>
  )
}
