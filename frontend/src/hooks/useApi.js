import { useState, useMemo } from "react";
import axios from "axios"

export default () => {
  const API_URL = "https://3030-a4ef1e69-fa7a-46d6-afbb-112d07974010.ws-eu01.gitpod.io/api"
  const [token, setToken] = useState(localStorage.getItem("token"))
  const updateToken = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
  }
  return useMemo(() => {
    return {
      api: axios.create({
        baseURL: API_URL,
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }),
      token,
      setToken: updateToken
    }
  }, [token])
}
