import React from 'react'
import { toast } from 'react-toastify'

/**
 * @type {import('react-toastify').ToastOptions}
 */
const DEFAULT_TOAST_CONFIG = {
    position: "bottom-center",
    theme: 'light',
    autoClose: 1500,
    hideProgressBar: true,
}

const useToastHook = () => {
    const betterFullFunctionalityToast = () => {
        return toast('Get the app now for full functionality', DEFAULT_TOAST_CONFIG)
    }

    const copyToClipboardToast = () => {
        return toast('The URL has been copied to your clipboard', DEFAULT_TOAST_CONFIG)
    }

    const copyAdminMessageToClipboardToast = () => {
        return toast('The message has been copied to your clipboard', DEFAULT_TOAST_CONFIG)
    }

    const noNewMessagesToast = () => {
        return toast('No new messages', DEFAULT_TOAST_CONFIG)
    }

    return {
        betterFullFunctionalityToast,
        copyToClipboardToast,
        copyAdminMessageToClipboardToast,
        noNewMessagesToast,
    }
}

export default useToastHook