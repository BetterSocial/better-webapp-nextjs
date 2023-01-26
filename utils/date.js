import moment from 'moment'

const DATE_FORMAT = 'MMM D, YYYY'

/**
 * 
 * @param {string} date 
 * @returns {string}
 */
const formatPostDate = (date) => {
    return dateAgo(date)
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

const dateAgo = (time) => {
    if (!time) return ''
    const now = moment();
    const utc = now;
    const date = moment.utc(time);
    const minutes = utc.diff(date, 'minutes');
    const hours = utc.diff(date, 'hours');
    const days = utc.diff(date, 'days');
    const weeks = utc.diff(date, 'weeks');

    if (days >= 30) {
        return date.format(DATE_FORMAT)
    }

    if (minutes < 60) {
        if (minutes === 0) {
            return '1m ago';
        }
        return `${minutes}m ago`;
    }
    if (hours < 24) {
        return `${hours}h ago`;
    }

    if (days < 2) {
        return 'Yesterday';
    }

    if (days >= 2 && days <= 6) {
        return `${days}d ago`;
    }

    if (days >= 7 && days <= 13) {
        return '1w ago';
    }

    return `${weeks}w ago`;

}

const DateUtils = {
    formatPostDate,
    isPostExpired,
    dateAgo
}

export default DateUtils