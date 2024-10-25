const adminGetChannelMessage = (limit: number, offset: number) => {
    return [
        {
            channelId: 'channel-1', 
            message: 'This is message 1', 
            recipientUsername: 'username-1',
            createdAt: new Date().toISOString(), 
            updatedAt: new Date().toISOString(),
            sender_anon_user_info_color_code: '#FF0000',
            sender_anon_user_info_color_name: 'Blue',
            sender_anon_user_info_emoji_code: '🐼',
            sender_anon_user_info_emoji_name: 'Panda',
        },
        {
            channelId: 'channel-2', 
            message: 'This is message 2', 
            recipientUsername: 'username-2',
            createdAt: new Date().toISOString(), 
            updatedAt: new Date().toISOString(),
            sender_anon_user_info_color_code: '#0000FF',
            sender_anon_user_info_color_name: 'Red',
            sender_anon_user_info_emoji_code: '🐦',
            sender_anon_user_info_emoji_name: 'Bird',
        },
        
    ]
}

export default adminGetChannelMessage