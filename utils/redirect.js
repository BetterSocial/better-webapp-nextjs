import Constant from 'utils/constant'
import { IResult } from 'ua-parser-js'
/**
 * 
 * @param {IResult} userAgent 
 */
const redirectPrivatePost = (userAgent) => {
    if (userAgent?.os?.name !== Constant.OS.Android && userAgent?.os?.name !== Constant.OS.iOS) {
        return {
            redirect: {
                destination: `https://bettersocial.org`,
            }
        }
    }

    if (userAgent?.os?.name === Constant.OS.Android) {
        return {
            redirect: {
                destination: Constant.Link.playstore,
            }
        }
    }

    if (userAgent?.os?.name === Constant.OS.iOS) {
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
    if (userAgent?.os?.name !== Constant.OS.Android && userAgent?.os?.name !== Constant.OS.iOS) {
        return {
            redirect: {
                destination: `https://bettersocial.org`,
            }
        }
    }

    if (userAgent?.os?.name === Constant.OS.Android) {
        return {
            redirect: {
                destination: Constant.Link.playstore,
            }
        }
    }

    if (userAgent?.os?.name === Constant.OS.iOS) {
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

const RedirectUtils = {
    redirectExpiredPost,
    redirectPrivatePost
}

export default RedirectUtils