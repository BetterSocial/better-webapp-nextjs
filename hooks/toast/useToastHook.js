import React from 'react'
import { toast } from 'react-toastify'

const useToastHook = () => {
    const betterFullFunctionalityToast = () => {
        return toast('Get the app now for full functionality', {
            position: "bottom-center",
            theme: 'light',
            autoClose: 1500,
            hideProgressBar: true,
        })
    }

    return {
        betterFullFunctionalityToast
    }
}

export default useToastHook