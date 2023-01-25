/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  images: {
    domains: [
      'play.google.com',
      'res.cloudinary.com'],
  }
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
}
