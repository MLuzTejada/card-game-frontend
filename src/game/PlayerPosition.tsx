import React from "react"
import TextField from "../common/components/Text"
import { useSessionUser } from "../store/userStore"
import Player from "./Player"

export default function PlayerPosition(props: {className: string, cards: string[], roomCode?: string | null, setPlayerCards?: any, disable: boolean}) {
    const user = useSessionUser()

    return (
        <div className={props.className}>
            <div className="centered">
            <TextField
                value={props.disable ? "jugador" : user?.username}
            />
            <Player cards={props.cards} roomCode={props.roomCode} setPlayerCards={props.setPlayerCards} disable={props.disable}/>
        </div>
        </div>
    )
}