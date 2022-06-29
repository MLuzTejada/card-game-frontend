import React from "react"
import { useSessionUser } from "../store/userStore"
import Card from "./Card"
import { makeMove } from "./gameService"
import "./Player.css"

export default function Player(props: { cards: string[] | undefined, disable: boolean, roomCode?: string | null, setPlayerCards?: any }) {
    const user = useSessionUser()

    const handleMove = async (card: string, roomCode?: string | null) => {
        try {
            if (user) {
                const response = await makeMove(card, roomCode, user.id)
                props.setPlayerCards(response.player.cards)
            }
        } catch (err: any) {
            throw err
        }
    }

    return (
        <div className="row">
            {props.cards?.map((card, i) =>
                <div className="column" key={i} >
                    <Card src={"/assets/cards/" + card + ".png"}
                        width={"60px"}
                        onClick={() => handleMove(card, props.roomCode)}
                        disable={props.disable}
                    />
                </div>)}
        </div>
    )
}