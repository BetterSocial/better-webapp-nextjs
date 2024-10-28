import adminGetChannelMessage from "databases/functions/ChannelMessages/adminGetChannelMessage";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAdminMessage(req: NextApiRequest, res: NextApiResponse) {
    const {limit = 10, offset = 0} = req.query
    try {
        const messages = await adminGetChannelMessage(limit as number, offset as number)
        return res.status(200).json({
            success: true,
            message: 'success',
            next: parseInt(offset as string) + parseInt(limit as string),
            data: messages
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error',
        })
    }
}