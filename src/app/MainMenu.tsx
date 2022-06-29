import React, { useState } from "react"
import {  NavLink, useNavigate } from "react-router-dom"
import Button from "../common/components/Button"
import { useSessionUser } from "../store/userStore"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import "./MainMenu.css"
import { newGame } from "../game/gameService"

export default function MainMenu() {
  const navigate = useNavigate()
  const user = useSessionUser()
  const errorHandler = useErrorHandler()

  const handleNewGame = async () => {
    try {
        if(user){
          const response = await newGame(user.id)
          navigate({pathname: '/game', search: '?roomCode=' + response.game.roomCode})
        } else {
          errorHandler.addError("user", "Debe iniciar sesion")
          navigate("/")
        }
    } catch (error: any) {
        // setError(error.response.data.message)
        throw error
    }
  }

  return (
    <div>
      <div className='Homepage'>
        <div className='homepage-menu'>
              <img src="/assets/logo.png" width='200px'/>
                <div className='homepage-form'>
                    <div className='homepage-join'>
                      <NavLink to="/joinGame">
                        <Button
                        value={"Unirse a una partida"}
                        className={"game-button green"}
                      />
                      </NavLink>
                    </div>
                    <div className='homepage-create'>
                      <Button
                        value={"Crear una partida"}
                        className={"game-button orange"}
                        onClick={handleNewGame}
                      />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}