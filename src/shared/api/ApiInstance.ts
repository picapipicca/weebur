import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 30_000,
});

ApiInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // 공통 에러 핸들링
    return Promise.reject(err);
  }
);
