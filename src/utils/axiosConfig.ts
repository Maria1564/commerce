import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api",
});
