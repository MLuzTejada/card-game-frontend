import axios from "axios"
import { environment } from "../app/environment/environment"
import { getCurrentToken } from "../user/userService"

axios.defaults.headers.common["Content-Type"] = "application/json"

export async function getCard(id: number): Promise<any> {
    try {
        const response = await axios.get(`${environment.backendUrl}/player/${id}/getCard`)
        return response.data
    } catch (err) {
        throw err
    }
}

export async function getPlayerCards(id: number): Promise<any> {
    try {
        const response = await axios.get(`${environment.backendUrl}/player/${id}/getDeck`)
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