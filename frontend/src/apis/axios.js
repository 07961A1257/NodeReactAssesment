import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/users",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
});
