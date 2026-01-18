import axios from "axios";


const BaseUrl = axios.create(
  {
    baseURL: "http://localhost:8080/api",
  }
)

export const requestQuery = async (query: string) => {
  const response = await BaseUrl.get(`/?q=${encodeURIComponent(query)}`)
  return response.data
}

