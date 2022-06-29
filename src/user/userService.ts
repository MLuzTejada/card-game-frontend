import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionUser, updateSessionUser } from "../store/userStore"
import { useNavigate } from "react-router-dom"

axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.withCredentials = true

export interface Token {
  token: string
}

export async function login(params: {
  username: string
  password: string
}): Promise<Token> {
  const res = (
    await axios.post(environment.backendUrl + "/player/login", params)
  ).data as Token
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser().then()
  return res
}

export async function sendUNO(id: number) {
  try {
    const response = await axios.post(environment.backendUrl + `/player/${id}/setUno`)
    return response.data
  } catch (err) {
    throw err
  }
}

// Valores almacenados en LOCAL STORE
export function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  axios.defaults.headers.common.Authorization = token
}

export function getCurrentUser(): User | undefined {
  return localStorage.getItem("user") as unknown as User
}

export async function logout(id: number): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  try {
    await axios.get(environment.backendUrl + `/player/logout/${id}`)
    axios.defaults.headers.common.Authorization = ""
    return
  } catch (err) {
    return
  } finally {
    cleanupSessionToken()
    cleanupSessionUser()
  }
}

export interface User {
  id: number
  username: string
  phone: string
  email: string
  cards: string[]
}

export async function reloadCurrentUser(): Promise<User> {
  try {
    const res = (await axios.get(environment.backendUrl + "/player/current"))
      .data as User
    localStorage.setItem("user", JSON.stringify(res))
    updateSessionUser(res)
    return res
  } catch (err) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const axiosError = err as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      navigate("/")
    }
    throw err
  }
}

export async function newUser(params: {
  password: string
  username: string
}): Promise<Token> {
  const res = (await axios.post(environment.backendUrl + "/player/register", params))
    .data as Token
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser().then()
  return res
}

export async function changePassword(params: {
  password: string
}, id: number): Promise<void> {
  try {
    await axios.put(environment.backendUrl + `/player/${id}/password`, params)
    return
  } catch (err) {
    const axiosError = err as AxiosError
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    if (axiosError.response && axiosError.response.status === 401) {
      navigate("/")
    }
    throw err
  }
}

if (getCurrentToken()) {
  const currentUser = getCurrentUser()
  const currentToken = getCurrentToken()
  if (currentUser !== undefined && currentToken !== undefined) {
    axios.defaults.headers.common.Authorization = currentToken
    updateSessionToken(currentToken)
    updateSessionUser(currentUser)
    void reloadCurrentUser().then()
  }
}
