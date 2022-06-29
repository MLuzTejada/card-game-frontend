import React, { useEffect } from "react"
import { useState } from "react"
import Deck from "./Deck"
import Text from './../common/components/Text'
import "./Game.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useSessionUser } from "../store/userStore"
import { getGameByPlayerId } from "./gameService"
import Button from "../common/components/Button"
import { getPlayerCards } from "./cardService"
import PlayerPosition from "./PlayerPosition"
import { sendUNO } from "../user/userService"

export default function Game() {
    const user = useSessionUser()
    const navigate = useNavigate()
    const [players, setPlayers] = useState(Array(4).fill(null))
    const [playerCards, setPlayerCards] = useState<string[]>([])
    const search = useLocation().search
    const roomCode = new URLSearchParams(search).get('roomCode')
    const [currentCard, setCurrentCard] = useState("back")
    const [allCards, setAllCards] = useState([])
    const [unoPlayer, setUnoPlayer] = useState([])

    useEffect(() => {
        let timer: any = 0
        if (user) {
            timer = setInterval(
                () => getGame(),
                1000)
        } else {
            navigate("/")
        }

        async function getGame() {
            const response = await getGameByPlayerId(user?.id)
            console.log(response)
            setCurrentCard(response.game.current_card)
            setPlayers(response.players)
            setAllCards(response.players.map((player: { cards: string | any[] }) => player.cards.length ))
            const playersFilter = response.players.filter((player: { uno: boolean }) => player.uno === true)
            setUnoPlayer(playersFilter.map((player: { username: any }) => {
                return player.username
            }))
        }

        return () => {
            clearInterval(timer)
        }
    }, [navigate, unoPlayer, user])

    const handleCards = async () => {
        try {
            if (user) {
                const response = await getPlayerCards(user.id)
                setPlayerCards(response.player.cards)
            }
        } catch (err: any) {
            throw err
        }
    }

    const handleUno = async () => {
        try {
            if(user){
                await sendUNO(user.id)
            }
        } catch (err: any) {
            throw err
        }
    }


    return (
        <div className="board">
            {players.map((player, i) => <PlayerPosition
                key={i}
                className={"player" + i.toString()}
                cards={player?.id === user?.id ? playerCards : Array(allCards[i]).fill("back") }
                disable={player?.id === user?.id ? false : true }
                roomCode={roomCode}
                setPlayerCards={setPlayerCards}
            />)}
            <Deck card={currentCard} setPlayerCards={setPlayerCards} />
            <div className="game_info">
                <Text
                    value={"Partida: #" + roomCode}
                />
                <Button
                    value={"Repartir cartas"}
                    className={"game-button orange"}
                    onClick={handleCards}
                />
                <Button
                    value={"UNO"}
                    className={"game-button green"}
                    onClick={handleUno}
                />
                {unoPlayer.length !== 0 ? <Text value={"El jugador " + unoPlayer[unoPlayer.length - 1] + " grito UNO"}
                /> : null}
            </div>
        </div>
    )
}