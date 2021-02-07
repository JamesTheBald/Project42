import axios from "axios";

const xios = axios.create({
  baseURL: "http://localhost:8082/api",   // This URL should be in an environment variable
  headers: {
    "Content-type": "application/json"
  }
});

export default xios;
