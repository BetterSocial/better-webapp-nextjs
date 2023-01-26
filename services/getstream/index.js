import Constant from 'utils/constant'

const stream = require('getstream')

/**
 * 
 * @param {getstream.StreamClient} client 
 * @returns {BetterSocialGetstreamInstance}
 */
const GetstreamInstance = (client) => {
    return {
        ...client,
        getPostById: async (postId) => {
            const response = await client.getActivities({
                ids: [postId],
                withOwnReactions: true,
                withOwnChildren: true,
                enrich: true,
                ownReactions: true,
                reactions: true,
                withReactionCounts: true,
                withRecentReactions: true,
            })

            /**
             * @type {GetstreamPost}
             */
            const feed = response.results[0]
            if (feed?.anonimity) {
                feed.actor.data = {
                    username: Constant.String.anonymous
                }
            }

            return feed
        }
    }
}

/**
 * Singleton pattern to create a single instance of the Getstream client
 * @returns {object} Getstream client
 */
const GetstreamSingleton = (function () {
    let instance

    function createInstance() {
        const client = stream.connect(process.env.GETSTREAM_API_KEY, process.env.GETSTREAM_API_SECRET, process.env.GETSTREAM_APP_ID)
        return GetstreamInstance(client)
    }

    return {
        /**
         * 
         * @returns {BetterSocialGetstreamInstance} Getstream client
         */
        getInstance: function () {
            if (!instance) {
                instance = createInstance()
            }

            return instance
        }
    }
})()

export default GetstreamSingleton