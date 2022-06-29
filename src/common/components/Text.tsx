import React from "react"

interface TextProps {
    value?: string
}

export default function TextField(props: TextProps){
    return (
        <h4 className="text">{props.value}</h4>
    )
}