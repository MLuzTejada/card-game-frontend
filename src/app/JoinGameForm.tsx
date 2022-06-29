import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../common/components/Button"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { newGame } from "../game/gameService"
import { useSessionUser } from "../store/userStore"

export default function JoinGameForm(){
    const navigate = useNavigate()
    const errorHandler = useErrorHandler()
    const user = useSessionUser()
    const [roomCode, setRoomCode] = useState("")

    const handleJoinGame = async () => {
        try {
            if(user) {
                const response = await newGame(user.id , roomCode)
                navigate({pathname: '/game', search: '?roomCode=' + response.game.roomCode})
            } else {
                errorHandler.addError("user", "Debe iniciar sesion")
                navigate("/")
            }
        } catch (err: any) {
            errorHandler.processRestValidations(err)
            throw err
        }
    }

    return (
        <div>
            <div className="Homepage">
                <form className="homepage-menu">
                    <img src="/assets/logo.png" width='200px'/><br></br>
                    <label className="form_label">
                        Id partida: #
                    </label>
                    <input type="text" name="game" className="input" required onChange={(event) => setRoomCode(event.target.value)} ></input><br></br>
                        <Button
                        value={"Jugar"}
                        className={"game-button green"}
                        onClick={handleJoinGame}
                    />
                </form>
            </div>
        </div>
    )
}