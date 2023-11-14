import axios from "axios";
import Cookies from "js-cookie";

import getConfig from "next/config";
import { ITokenEnum } from "@shared/enum";

const { publicRuntimeConfig } = getConfig();

const baseURL = publicRuntimeConfig.BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "content-type": "application/json"},
});
api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get(ITokenEnum.anonymousToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.config?.url !== "/users/refresh-token"
    ) {
      const token = Cookies.get(ITokenEnum.refreshToken);
      const refreshApi = axios.create({
        baseURL,
        timeout: 3000,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      return refreshApi.get("/users/refresh-token").then(
        async (refreshResponse) => {
          const data = refreshResponse?.data?.data;
          if (data?.token) {
            Cookies.set(ITokenEnum.token, data?.token);
            Cookies.set(ITokenEnum.refreshToken, data?.refresh_token);
            Cookies.set(ITokenEnum.anonymousToken, data?.anonymousToken);
            error.config.headers.Authorization = `Bearer ${data?.token}`;
            return axios.request(error?.config);
          }
          return Promise.reject(error);
        },
        (refreshError) => {
          console.log("[refreshError]: ", refreshError);
          return Promise.reject(error);
        }
      );
    }
    return Promise.reject(error);
  }
);

export default api;
