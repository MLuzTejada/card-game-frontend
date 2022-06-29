import axios from "axios"
import { environment } from "../app/environment/environment"
import { getCurrentToken } from "../user/userService"

axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Game {
    message: string;
    game: {
        roomCode: string;
    };
    player: any;
}

export async function getGameByPlayerId(id?: number) {
    try {
        const response = await axios.get(environment.backendUrl + `/player/${id}/getGame`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function newGame(id: number, roomCode?: string): Promise<Game> {
    try {
        const response = await axios.post(environment.backendUrl + "/game", {
            id,
            roomCode
        })
        return response.data
    } catch (err) {
        throw err
    }
}

export async function makeMove(card: string, roomCode?: string | null, id?: number): Promise<Game> {
    try {
        const response = await axios.post(environment.backendUrl + "/move", {
            card,
            roomCode,
            id
        })
        return response.data
    } catch (err) {
        throw err
    }
}

if (getCurrentToken()) {
    const currentToken = getCurrentToken()
    if (currentToken !== undefined) {
        axios.defaults.headers.common.Authorization = currentToken
    }
}

