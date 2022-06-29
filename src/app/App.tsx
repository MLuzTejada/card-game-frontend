import React from "react"
import {
  BrowserRouter, Outlet, Route, Routes
} from "react-router-dom"
import { StateLoggedInRoute } from "../common/components/LoggedInRoute"
import Game from "../game/Game"
import Info from "../info/Info"
import Profile from "../profile/Profile"
import Login from "../user/Login"
import Password from "../user/Password"
import Register from "../user/Register"
import "./App.css"
import JoinGameForm from "./JoinGameForm"
import Menu from "./Menu"
import Toolbar from "./Toolbar"

export default function App() {
  return (
    <BrowserRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="content" className="app_content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/newUser" element={<Register />} />
                <Route path="/info" element={<StateLoggedInRoute component={Info} />} />
                <Route path="/profile" element={<StateLoggedInRoute component={Profile} /> } />
                <Route path="/password" element={<StateLoggedInRoute component={Password}/>} />
                <Route path="/menu" element={<StateLoggedInRoute component={Menu} />} />
                <Route path="/game" element={<StateLoggedInRoute component={Game} />} />
                <Route path="/joinGame" element={<StateLoggedInRoute component={JoinGameForm} />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet />
    </BrowserRouter >
  )
}
