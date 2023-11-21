// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default function getWebLogin(req, res) {
  fetch(serverRuntimeConfig.HUMAN_ID_GET_WEB_LOGIN_URL, {
    method: "POST",
    headers: {
      "client-id": serverRuntimeConfig.HUMAN_ID_CLIENT_ID,
      "client-secret": serverRuntimeConfig.HUMAN_ID_CLIENT_SECRET,
      "Content-Type": "application/json",
    },
  })
    .then(async (result) => {
      const data = await result.json();
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}
