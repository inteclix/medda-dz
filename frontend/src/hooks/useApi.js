import { useState, useMemo } from "react";
import axios from "axios"

export default () => {
  const API_URL = "https://3030-e81f9d4b-10c9-4038-9444-1be9b0249ef7.ws-eu01.gitpod.io/api"
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
