export type AdminChannelMessage = {
    channel_id: string
    message_id: string
    message: string
    created_at: string
    updated_at: string
    sender_anon_user_info_color_code: string
    sender_anon_user_info_color_name: string
    sender_anon_user_info_emoji_code: string
    sender_anon_user_info_emoji_name: string
    target_username: string
    target_profile_pic: string
    sender_username: string
    sender_profile_pic: string
    sender_is_anonymous: boolean
}

export type AdminMessageItemComponentProps = {
    item: AdminChannelMessage;
}