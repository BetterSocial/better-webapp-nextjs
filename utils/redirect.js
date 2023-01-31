import Constant from 'utils/constant'
import DynamicLinkUtils from 'utils/dynamicLink'
import UserAgentUtils from 'utils/userAgent'
import { IResult } from 'ua-parser-js'
import { userAgent } from 'next/server'

/**
 * 
 * @param {IResult} userAgent 
 */
const redirectPrivatePost = (userAgent) => {
    if (!UserAgentUtils.isMobile(userAgent)) {
        return {
            redirect: {
                destination: `https://bettersocial.org`,
            }
        }
    }

    if (UserAgentUtils.isAndroid(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.playstore,
            }
        }
    }

    if (UserAgentUtils.isIos(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.appstore,
            }
        }
    }

    return {
        redirect: {
            destination: `/post/private`,
        }
    }
}

/**
 * 
 * @param {IResult} userAgent 
 */
const redirectExpiredPost = (userAgent) => {
    if (!UserAgentUtils.isMobile(userAgent)) {
        return {
            redirect: {
                destination: `https://bettersocial.org`,
            }
        }
    }

    if (UserAgentUtils.isAndroid(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.playstore,
            }
        }
    }

    if (UserAgentUtils.isIos(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.appstore,
            }
        }
    }

    return {
        redirect: {
            destination: `/post/expired`,
        }
    }
}

/**
 * 
 * @param {IResult} userAgent
 * @param {GetstreamPost} post
 * @returns
 */
const redirectMobileDevice = async (userAgent, post) => {
    if (UserAgentUtils.isMobile(userAgent)) {
        let postLink = await DynamicLinkUtils.generatePostLink(post)
        if (postLink) return {
            redirect: {
                destination: postLink,
            }
        }

        return false
    }

}

const RedirectUtils = {
    redirectExpiredPost,
    redirectPrivatePost,
    redirectMobileDevice
}

export default RedirectUtils