import React from "react"
import "./Card.css"

export default function Card(props: { src: string, width: string, disable?: boolean, onClick?: (()  => any); }){
    return(
        <img className="card"
            src={props.src}
            width={props.width}
            onClick={props.onClick}
            style={ props.disable ? {pointerEvents: "none", opacity: "0.9"} : {}}
        >
        </img>
    )
}