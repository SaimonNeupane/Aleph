import axios from "axios";

export async function fetchQueries(keywords: string) {
  const res = await axios.get(`http://localhost:8080/api/query/${keywords}`);
  return res.data;
}
