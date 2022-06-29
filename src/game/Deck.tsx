import React from "react"
import { useSessionUser } from "../store/userStore"
import Card from "./Card"
import { getCard } from "./cardService"
import "./Deck.css"

export default function Deck (props: {card: string, setPlayerCards?: any}){
    const user = useSessionUser()

    const handleGetCard = async () => {
        try {
            if(user){
                const response = await getCard(user.id)
                props.setPlayerCards(response.player.cards)
            }
        } catch (err: any) {
            throw err
        }
    }

    return(
        <div className="deck">
            <div className="centered">
                <Card src={"/assets/cards/back.png"}
                    width={"80px"}
                    onClick={handleGetCard}
                />
                <Card src={"/assets/cards/" + props.card + ".png"}
                    width={"80px"}
                    disable={true}
                />
            </div>
        </div>
    )
}

