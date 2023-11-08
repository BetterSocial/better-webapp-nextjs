import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
