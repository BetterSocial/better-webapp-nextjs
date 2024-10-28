import { AdminChannelMessage } from "types/Feature/AdminMessagesList/AdminMessageItem";
import { BaseResponse } from "types/Services/baseResponse";

const getAllAdminMessages = async(limit: number, offset: number): Promise<BaseResponse<AdminChannelMessage[]>> => {
    const response = await fetch(`/api/message/get-admin-message?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return await response.json()
}

export { getAllAdminMessages }