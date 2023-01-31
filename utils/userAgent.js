import Constant from 'utils/constant'
import { IResult } from 'ua-parser-js'

/**
 * 
 * @param {IResult} userAgent 
 * @returns {boolean}
 */
const isMobile = (userAgent) => {
    const { name = '' } = userAgent?.os
    return [Constant?.OS.Android, Constant?.OS.iOS].includes(name)
}

/**
 * 
 * @param {IResult} userAgent 
 * @returns {boolean}
 */
const isAndroid = (userAgent) => {
    const { name = '' } = userAgent?.os
    return [Constant?.OS.Android].includes(name)
}

/**
 * 
 * @param {IResult} userAgent 
 * @returns {boolean}
 */
const isIos = (userAgent) => {
    const { name = '' } = userAgent?.os
    return [Constant?.OS.iOS].includes(name)
}



const UserAgentUtils = {
    isMobile,
    isAndroid,
    isIos
}

export default UserAgentUtils