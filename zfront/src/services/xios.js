import axios from "axios";

const xios = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-type": "application/json"
  }
});

export default xios;
