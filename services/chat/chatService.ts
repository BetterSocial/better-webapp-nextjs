'use client'

export type ChatServiceSendMessageParams = {
    anon_user_info_color_code: string;
    anon_user_info_color_name: string;
    anon_user_info_emoji_code: string;
    anon_user_info_emoji_name: string;
    member: string;
    message: string
}

export type BetterSocialResponse<T> = {
  success: boolean;
  message: string;
  data: T
}

export type SendMessageResponse = {
  channel_id: string;
}

const sendMessage = async (data: ChatServiceSendMessageParams): Promise<BetterSocialResponse<SendMessageResponse>> => {
  const response = await fetch('/api/chat/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return await response.json()
}

export { sendMessage }