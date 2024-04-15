import { MessageEnum } from "@shared/enum"
import { useEffect } from "react"

export default function LocalStorageHandler() {
    useEffect(() => {
        window.addEventListener('message', (event) => {
            localStorage.setItem(MessageEnum.targetUser, event?.data?.target_user_id)
            localStorage.setItem(MessageEnum.tempMessage, event?.data?.message)
        })
    }, [])
    
    return <></>
}