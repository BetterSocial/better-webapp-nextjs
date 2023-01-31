import { FirebaseDynamicLinks } from "firebase-dynamic-links"

/**
 * 
 * @param {GetstreamPost} post 
 * @returns {string}
 */
const generatePostLink = async (post) => {
    const { FIREBASE_DYNAMIC_LINK_URL,
        FIREBASE_API_KEY,
        BETTER_WEB_APP_URL,
        FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
        FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE,
        BETTER_APP_STORE_ID } = process.env

    const firebaseDynamicLinks = new FirebaseDynamicLinks(FIREBASE_API_KEY)
    try {
        const betterWebAppUrl = `${BETTER_WEB_APP_URL}?postId=${post?.id}&isDynamicLink=true`
        const { shortLink } = await firebaseDynamicLinks.createLink({
            longDynamicLink: `${FIREBASE_DYNAMIC_LINK_URL}?link=${betterWebAppUrl}&apn=${FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE}&afl=${betterWebAppUrl}&isi=${BETTER_APP_STORE_ID}&ibi=${FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE}&ifl=${betterWebAppUrl}`
        })

        return shortLink
    } catch (e) {
        console.log(e)
        return false
    }
}

const DynamicLinkUtils = {
    generatePostLink
}

export default DynamicLinkUtils