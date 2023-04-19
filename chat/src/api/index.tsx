import axios, { AxiosInstance } from "axios";
export default class Api {
  static request: AxiosInstance;

  static createInstance(): void {
    if (!Api.request) {
      Api.request = axios.create({
        baseURL: "http://localhost:5200",
        timeout: 1000 * 120,
      });
      Api.request.interceptors.response.use((response) => {
        return response
      }, (error) => {
        return Promise.reject(error)
      });
    }
  }
}

Api.createInstance();
