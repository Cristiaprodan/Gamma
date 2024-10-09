import { Api } from "nocodb-sdk";

const api = new Api({
  baseURL: process.env.NUXT_BASE_URL,
  headers: {
    "xc-token": process.env.NUXT_API_TOKEN,
  },
});

export default api;
