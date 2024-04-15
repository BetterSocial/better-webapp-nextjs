/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  images: {
    domains: ["play.google.com", "res.cloudinary.com"],
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || "https://devme.bettersocial.org",
    DOWNLOAD_BETTERSOCIAL_APP_URL:
      process.env.DOWNLOAD_BETTERSOCIAL_APP_URL ||
      "https://linkdev.bettersocial.org/download",
    HUMAN_INTERNET_URL:
      process.env.HUMAN_INTERNET_URL || "https://human-internet.org/",
    DYNAMIC_LINK_DOMAIN:
      process.env.DYNAMIC_LINK_DOMAIN || "https://dev.helio.social",
    WIX_URL: process.env.WIX_URL || 'https://home.helio.social/',
    LOCAL_STORAGE_HANDLER: `${process.env.HUMAN_ID_WEB_APP_REDIRECT_URL}/localstorage-handler` || 'https://www.helio.social/localstorage-handler' 
  },
  serverRuntimeConfig: {
    HUMAN_ID_GET_WEB_LOGIN_URL: process.env.HUMAN_ID_GET_WEB_LOGIN_URL,
    HUMAN_ID_CLIENT_ID: process.env.HUMAN_ID_CLIENT_ID,
    HUMAN_ID_CLIENT_SECRET: process.env.HUMAN_ID_CLIENT_SECRET,
  },
  redirects: async () => [
    {
      source: '/:username*',
      has: [
        { type: 'host', value: 'http://www.helio.social*'}],
      destination: 'https://www.helio.social/:username*',
      permanent: true
    },
    {
      source: '/:username*',
      has: [
        { type: 'host', value: 'http://www.helio.social*'}],
      destination: 'https://www.helio.social/:username*',
      permanent: true
    },
    {
      source: '/:username*',
      has: [
        { type: 'host', value: 'http://helio.social*'}],
      destination: 'https://www.helio.social/:username*',
      permanent: true
    }
  ]
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
};
