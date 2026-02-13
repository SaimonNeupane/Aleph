import axios from "axios";


const BaseUrl = axios.create(
  {
    baseURL: "http://localhost:8080/api",
  }
)

// api.ts
export const requestQuery = async (query: string, page: number) => {
  // Pass the page parameter to the backend
  const response = await BaseUrl.get(`/?q=${encodeURIComponent(query)}&page=${page}`)
  return response.data
}
