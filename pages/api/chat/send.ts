import isAuthValid from "utils/jwt";
import {ChannelMembers, ChannelMessages, Channels, sequelize} from 'databases/models';
import { NextApiRequest, NextApiResponse } from "next";

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

    const existingChannelResult = await sequelize.query(`
        SELECT channel_id
        FROM channel_members
        WHERE user_id IN (:self, :target)
        GROUP BY channel_id`,
        {
            replacements: {
                self: user?.user_id,
                target: member
            },
            raw: true
        }
    )

    const existingChannel = existingChannelResult?.[0]
    if(!existingChannel) {
        
    }

    console.log('existing channel', existingChannel?.[0])

    res.json(req.body);
}