/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  images: {
    domains: [
      'play.google.com',
      'res.cloudinary.com'],
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || 'https://devme.bettersocial.org',
    HUMAN_ID_GET_WEB_LOGIN_URL: process.env.HUMAN_ID_GET_WEB_LOGIN_URL || 'https://core.human-id.org/v0.0.3/server/users/web-login',
    HUMAN_ID_CLIENT_ID: process.env.HUMAN_ID_CLIENT_ID || 'SERVER_83XB8BLZ8GOOTA51H9OFQ5',
    HUMAN_ID_CLIENT_SECRET: process.env.HUMAN_ID_CLIENT_SECRET || 'ieGo4-YqMa53OGBXOrg5W~0B314qtyGPA2GuZz7EbVI9qIrrL6Wa~a_ejMJjYLL1',
  }
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
}
