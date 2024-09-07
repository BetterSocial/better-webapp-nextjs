import getConfig from 'next/config';
import moment from 'moment/moment';
import {Analytics} from '@segment/analytics-node'
import { NextApiRequest, NextApiResponse } from 'next';

const { serverRuntimeConfig } = getConfig();

export default async function sendAnalytics(req: NextApiRequest, res: NextApiResponse) {
    const {event, data = {}} = req?.body;
    const anonymousId = req.cookies['user_id'] || req.cookies['helio_analytics_id'] || moment().unix().toString()
    const signedUserId = req.cookies['user_id']

    try {
        const client = new Analytics({
            writeKey: serverRuntimeConfig.SEGMENT_WRITE_KEY,
        })
    
        client.track({
            event,
            anonymousId,
            properties: {
                ...data,
                signedUserId,
            }
        })
    } catch (e) {
        console.log("Error sending analytics", e)
    } finally {
        res.setHeader('Set-Cookie', 'helio_analytics_id=' + anonymousId + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + 60 * 60 * 24 * 30)
        return res.json({success: true})
    }
}