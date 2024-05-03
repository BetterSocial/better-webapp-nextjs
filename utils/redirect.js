import Constant from 'utils/constant'
import DynamicLinkUtils from 'utils/dynamicLink'
import UserAgentUtils from 'utils/userAgent'
import { IResult } from 'ua-parser-js'
import { userAgent } from 'next/server'

/**
 * 
 * @param {IResult} userAgent 
 */
const redirectPrivatePost = async (userAgent, post) => {
    if (!UserAgentUtils.isMobile(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.bettersocial,
            }
        }
    }

    if (UserAgentUtils.isMobile(userAgent)) {
        let postLink = await DynamicLinkUtils.generateMobilePrivateLink(post)
        if (postLink) return {
            redirect: {
                destination: postLink,
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
const redirectExpiredPost = async (userAgent) => {
    if (!UserAgentUtils.isMobile(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.bettersocial,
            }
        }
    }

    if (UserAgentUtils.isMobile(userAgent)) {
        let postLink = await DynamicLinkUtils.generateExpiredPostLink()
        if (postLink) return {
            redirect: {
                destination: postLink,
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

const redirectCommunityForMobileDevice = async (userAgent, communityName) => {
    if (UserAgentUtils.isMobile(userAgent)) {
        let postLink = await DynamicLinkUtils.generateCommunityLink(communityName)
        if (postLink) return {
            redirect: {
                destination: postLink,
            }
        }

        return false
    }
}

const redirectUsernameForMobileDevice = async (userAgent, username) => {
    if (UserAgentUtils.isMobile(userAgent)) {
        let usernameLink = await DynamicLinkUtils.generateUsernameLink(username)
        if (usernameLink) return {
            redirect: {
                destination: usernameLink,
            }
        }

        return false
    }
}



const RedirectUtils = {
    redirectExpiredPost,
    redirectPrivatePost,
    redirectMobileDevice,
    redirectCommunityForMobileDevice,
    redirectUsernameForMobileDevice
}

export default RedirectUtils