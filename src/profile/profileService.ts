import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { environment } from "../app/environment/environment"
import { logout } from "../user/userService"

interface Profile {
  username: string
  email: string
  province: string
  image: string
  phone: string
}

export async function updateBasicInfo(params: {
  username: string
  email: string
  phone: string
}, id: number): Promise<Profile> {
  try {
    const res = (
      await axios.put(environment.backendUrl + `/player/${id}`, params)
    ).data as Profile
    return res
  } catch (err) {
    if ((err as AxiosError).code === "401") {
      void logout(id)
    }
    throw err
  }
}

interface UpdateProfileImageId {
  image_url: string
}

export async function updateProfilePicture(params: any, id: number): Promise<UpdateProfileImageId> {
  // eslint-disable-next-line no-console
  console.log("image: ", params)
  return (
    await axios.put(environment.backendUrl + `/player/${id}/image`, params)
  ).data as UpdateProfileImageId
}

export async function getCurrentProfile(): Promise<Profile> {
  const navigate = useNavigate()
  try {
    return (await axios.get(environment.backendUrl + "player/current"))
      .data as Profile
  } catch (err) {
    const axiosError = err as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      navigate("/")
    }
    throw err
  }
}
