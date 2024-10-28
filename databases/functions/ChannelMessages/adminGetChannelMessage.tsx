import { AdminChannelMessage } from 'types/Feature/AdminMessagesList/AdminMessageItem';
import {sequelize} from 'databases/models'

const adminGetChannelMessage = async (limit: number, offset: number): Promise<AdminChannelMessage[]> => {
    const query = `
        SELECT 
            channel_messages.channel_id,
            channel_messages.message_id,
            channel_messages.message,
            channel_messages.created_at,
            channel_messages.updated_at,
            sender_members.anon_user_info_color_code as sender_anon_user_info_color_code,
            sender_members.anon_user_info_color_name as sender_anon_user_info_color_name,
            sender_members.anon_user_info_emoji_code as sender_anon_user_info_emoji_code,
            sender_members.anon_user_info_emoji_name as sender_anon_user_info_emoji_name,
            target_users.username as target_username,
            target_users.profile_pic_path as target_profile_pic,
            CASE 
                WHEN sender_users.is_anonymous = TRUE THEN ''
                ELSE sender_users.username
            END as sender_username,
            CASE 
                WHEN sender_users.is_anonymous = TRUE THEN ''
                ELSE sender_users.profile_pic_path
            END as sender_profile_pic,
            sender_users.is_anonymous as sender_is_anonymous
        FROM channel_messages
        INNER JOIN 
            channels 
        ON channels.channel_id::text = channel_messages.channel_id
        INNER JOIN 
            channel_members as target_members
        ON target_members.user_id != channel_messages.user_id
        INNER JOIN 
            channel_members as sender_members
        ON sender_members.user_id = channel_messages.user_id
        INNER JOIN 
            users as target_users
        ON target_members.user_id = target_users.user_id
        INNER JOIN 
            users as sender_users
        ON sender_members.user_id = sender_users.user_id
        ORDER BY channel_messages.created_at DESC
        LIMIT :limit 
        OFFSET :offset;`

    try {
        const queryResult = await sequelize.query(query, {
            replacements: {
                limit,
                offset
            },
            raw: true
        })
    
        return queryResult?.[0]?.map((item) => ({
            ...item,
            created_at: new Date(item.created_at).toISOString(),
            updated_at: new Date(item.updated_at).toISOString()
        }))
    } catch (error) {
        console.error(error)
        return []
    }
}

export default adminGetChannelMessage