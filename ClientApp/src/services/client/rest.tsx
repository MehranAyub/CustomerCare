import axios from "axios";

//export const BASE_URL = "http://52.168.95.49:81/api/";
export const BASE_URL = "https://localhost:7216/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
