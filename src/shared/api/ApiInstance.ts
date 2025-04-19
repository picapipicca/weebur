import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 30_000,
});

ApiInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);
