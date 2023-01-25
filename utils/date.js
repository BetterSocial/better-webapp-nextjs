import moment from 'moment'

/**
 * 
 * @param {string} date 
 * @returns {string}
 */
const formatPostDate = (date) => {
    const postDateMoment = moment(date)
    return postDateMoment.format('MMM DD, YYYY')
}

/**
 * 
 * @param {GetstreamPost} post
 * @returns {boolean}
 */

const isPostExpired = (post) => {
    const postDateMoment = moment(post?.expired_at)
    const now = moment()
    return now.isAfter(postDateMoment)
}

const DateUtils = {
    formatPostDate,
    isPostExpired
}

export default DateUtils