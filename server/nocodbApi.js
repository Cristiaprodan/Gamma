import { Api } from "nocodb-sdk";

const api = new Api({
  baseURL: "http://193.160.119.179",
  headers: {
    "xc-token": process.env.NUXT_API_TOKEN,
  },
});

export default api;
