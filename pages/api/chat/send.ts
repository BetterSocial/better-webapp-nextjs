import isAuthValid from "utils/jwt";
import {ChannelMembers, ChannelMessages, Channels, sequelize} from 'databases/models';
import { Model } from "sequelize";
import { NextApiRequest, NextApiResponse } from "next";
import {v4 as uuid} from 'uuid';

export type DBChannel = {
    id: string;
    channel_id: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}

export type UserInfo = {
    user_id: string;
    anon_user_info_color_code?: string; 
    anon_user_info_color_name?: string;
    anon_user_info_emoji_code?: string; 
    anon_user_info_emoji_name?: string;
}

async function insertMember(channelId: string, user: UserInfo): Promise<void> {
    await ChannelMembers.create({
        channel_id: channelId,
        user_id: user?.user_id,
        anon_user_info_color_code: user?.anon_user_info_color_code,
        anon_user_info_color_name: user?.anon_user_info_color_name,
        anon_user_info_emoji_code: user?.anon_user_info_emoji_code,
        anon_user_info_emoji_name: user?.anon_user_info_emoji_name
    }, {
        raw: true
    })
}

async function createNewChannel(selfUser: UserInfo, targetUserId: string): Promise<DBChannel> {
    const channelId = uuid();

    const channel = await Channels.create({
        channel_id: channelId,
        created_by: selfUser?.user_id
    }, {
        raw: true
    })

    const insertSelf = insertMember(channelId, selfUser)
    const insertTarget = insertMember(channelId, {
        user_id: targetUserId
    })

    await Promise.all([insertSelf, insertTarget])

    const castedChannel = ((channel as unknown) as DBChannel)
    return {
        id: castedChannel?.id,
        channel_id: castedChannel?.channel_id,
        created_by: castedChannel?.created_by,
        created_at: castedChannel?.created_at,
        updated_at: castedChannel?.updated_at
    };
}

async function getOrCreateChannel(selfUser: UserInfo, targetUserId: string): Promise<DBChannel> {
    const existingChannelResult = await sequelize.query(`
        SELECT channel_id
        FROM channel_members
        WHERE user_id IN (:self, :target)
        GROUP BY channel_id`,
        {
            replacements: {
                self: selfUser?.user_id,
                target: targetUserId
            },
            raw: true
        }
    )

    const existingChannel = existingChannelResult?.[0]?.[0]
    if(existingChannel) return existingChannel

    return await createNewChannel(selfUser, targetUserId)
}

async function insertNewMessage(channel_id: string, selfUserId: string, message: string): Promise<void> {
    await ChannelMessages.create({
        message_id: uuid(),
        channel_id: channel_id,
        user_id: selfUserId,
        message: message
    }, {
        raw: true
    })
}

export default async function sendChat(req: NextApiRequest, res: NextApiResponse) {
    const {
        anon_user_info_color_code, 
        anon_user_info_color_name, 
        anon_user_info_emoji_code, 
        anon_user_info_emoji_name,
        message,
        member
    } = req?.body; 

    const anonToken = req.cookies['anonymousToken'];
    const user = isAuthValid(anonToken);

    if(!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token'
        })
    }

    const selfUser: UserInfo = {
        user_id: user?.user_id,
        anon_user_info_color_code: anon_user_info_color_code,
        anon_user_info_color_name: anon_user_info_color_name,
        anon_user_info_emoji_code: anon_user_info_emoji_code,
        anon_user_info_emoji_name: anon_user_info_emoji_name
    }   

    try {
        const dbChannel: DBChannel = await getOrCreateChannel(selfUser, member)
        await insertNewMessage(dbChannel?.channel_id, user?.user_id, message);
        res.json({
            success: true,
            message: 'Message sent',
            data: dbChannel
        });
    } catch(e) {
        console.error('Error sending message', e)
        res.status(500).json({
            success: false,
            message: 'Message cannot be sent, please try again',
        })
    }    
}