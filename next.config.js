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
  }
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
}
