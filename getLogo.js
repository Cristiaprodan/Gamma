import { Api } from "nocodb-sdk";

const api = new Api({
  baseURL: "http://193.160.119.179",
  headers: {
    "xc-token": "xZi5PkK-ToDAY3d4th80CiCBap0DPwvugEB5yk58",
  },
});

api.dbView
  .list("noco", "pm6ki25nwijgjda", "m1urcj8gi35hvr3")
  .then(function (data) {
    console.log("Available Views:", data);
  })
  .catch(function (error) {
    console.error("Error listing views:", error);
  });
