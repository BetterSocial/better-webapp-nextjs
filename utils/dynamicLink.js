import Constant from "utils/constant"
import { FirebaseDynamicLinks } from "firebase-dynamic-links"
const { FIREBASE_DYNAMIC_LINK_URL,
    FIREBASE_API_KEY,
    BETTER_WEB_APP_URL,
    FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
    FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE,
    BETTER_APP_STORE_ID } = process.env

const firebaseDynamicLinks = new FirebaseDynamicLinks(FIREBASE_API_KEY)

const generateLongDynamicLink = async (redirectDesktopLink, redirectAndroidLink = null, redirectIosLink = null) => {
    if (redirectAndroidLink === null) redirectAndroidLink = redirectDesktopLink
    if (redirectIosLink === null) redirectIosLink = redirectDesktopLink

    const { shortLink, previewLink } = await firebaseDynamicLinks.createLink({
        dynamicLinkInfo: {
            domainUriPrefix: `${FIREBASE_DYNAMIC_LINK_URL}`,
            link: redirectDesktopLink,
            androidInfo: {
                androidPackageName: FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
                androidFallbackLink: redirectAndroidLink
            },
            iosInfo: {
                iosBundleId: FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE,
                iosFallbackLink: redirectIosLink
            },
            navigationInfo: {
                enableForcedRedirect: true,
            }
        },
        suffix: {
            option: 'SHORT'
        }
    })

    console.log('link', shortLink, previewLink);

    return shortLink
}

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
        return await generateLongDynamicLink(betterWebAppUrl, Constant.Link.playstore, Constant.Link.appstore)
    } catch (e) {
        console.log(e)
        return false
    }
}

/**
 * 
 * @param {GetstreamPost} post 
 * @returns {string}
 */
const generateMobilePrivateLink = async (post) => {
    try {
        const betterWebAppUrl = `${BETTER_WEB_APP_URL}?postPrivateId=${post?.id}`
        return await generateLongDynamicLink(betterWebAppUrl)
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
    // try {
    //     const { shortLink } = await firebaseDynamicLinks.createLink({
    //         dynamicLinkInfo: {
    //             domainUriPrefix: `${FIREBASE_DYNAMIC_LINK_URL}`,
    //             link: `${FIREBASE_DYNAMIC_LINK_URL}/postexpired`,
    //             androidInfo: {
    //                 androidPackageName: FIREBASE_DYNAMIC_LINK_ANDROID_APP_PACKAGE,
    //             },
    //             iosInfo: {
    //                 iosBundleId: FIREBASE_DYNAMIC_LINK_IOS_APP_PACKAGE
    //             }
    //         }
    //     })

    //     return shortLink

    // } catch (e) {
    //     console.log(e)
    //     return false
    // }
    try {
        const betterWebAppUrl = `${BETTER_WEB_APP_URL}?postExpired=true`
        return await generateLongDynamicLink(betterWebAppUrl)
    } catch (e) {
        console.log(e)
        return false
    }
}

const generateCommunityLink = async (communityName) => {
    try {
        /**
         * @description Add + to topicId to flag dynamic link
         */
        const betterWebAppUrl = `${BETTER_WEB_APP_URL}?communityName=${communityName}+`
        return await generateLongDynamicLink(betterWebAppUrl, Constant.Link.playstore, Constant.Link.appstore)
    } catch (e) {
        console.log(e)
        return false
    }
}

const generateUsernameLink = async (username) => {
    try {
        const betterWebAppUrl = `${BETTER_WEB_APP_URL}/?username=${username}+`
        return await generateLongDynamicLink(betterWebAppUrl)
    } catch(e) {
        console.log(e);
        return false;
    }
}

const DynamicLinkUtils = {
    generatePostLink,
    generateExpiredPostLink,
    generatePrivateLink,
    generateCommunityLink,
    generateMobilePrivateLink,
    generateUsernameLink
}

export default DynamicLinkUtils
