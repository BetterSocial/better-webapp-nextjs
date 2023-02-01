import { FirebaseDynamicLinks } from "firebase-dynamic-links"
const { FIREBASE_DYNAMIC_LINK_URL,
    FIREBASE_API_KEY,
    BETTER_WEB_APP_URL,
    FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
    FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE,
    BETTER_APP_STORE_ID } = process.env

const firebaseDynamicLinks = new FirebaseDynamicLinks(FIREBASE_API_KEY)
/**
 * 
 * @param {GetstreamPost} post 
 * @returns {string}
 */
const generatePostLink = async (post) => {
    try {
        /**
         * @description Add 1 to postId to flag dynamic link
         */
        const betterWebAppUrl = `${BETTER_WEB_APP_URL}?postId=${post?.id}1`
        const { shortLink } = await firebaseDynamicLinks.createLink({
            longDynamicLink: `${FIREBASE_DYNAMIC_LINK_URL}?link=${betterWebAppUrl}&apn=${FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE}&afl=${betterWebAppUrl}&isi=${BETTER_APP_STORE_ID}&ibi=${FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE}&ifl=${betterWebAppUrl}`
        })

        console.log(shortLink)

        return shortLink
    } catch (e) {
        console.log(e)
        return false
    }
}

const generatePrivateLink = async () => {
    try {
        const { shortLink } = await firebaseDynamicLinks.createLink({
            dynamicLinkInfo: {
                domainUriPrefix: `${FIREBASE_DYNAMIC_LINK_URL}`,
                link: `${FIREBASE_DYNAMIC_LINK_URL}/postprivate`,
                androidInfo: {
                    androidPackageName: FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
                },
                iosInfo: {
                    iosBundleId: FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE
                }
            }
        })

        return shortLink

    } catch (e) {
        console.log(e)
        return false
    }
}


const generateExpiredPostLink = async () => {
    try {
        const { shortLink } = await firebaseDynamicLinks.createLink({
            dynamicLinkInfo: {
                domainUriPrefix: `${FIREBASE_DYNAMIC_LINK_URL}`,
                link: `${FIREBASE_DYNAMIC_LINK_URL}/postexpired`,
                androidInfo: {
                    androidPackageName: FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
                },
                iosInfo: {
                    iosBundleId: FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE
                }
            }
        })

        return shortLink

    } catch (e) {
        console.log(e)
        return false
    }
}

const DynamicLinkUtils = {
    generatePostLink,
    generateExpiredPostLink,
    generatePrivateLink
}

export default DynamicLinkUtils