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

const dateAgo = (time, textAgo = 'ago') => {
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
            return `1m ${textAgo}`;
        }
        return `${minutes}m ${textAgo}`;
    }
    if (hours < 24) {
        return `${hours}h ${textAgo}`;
    }

    if (days < 2) {
        return 'Yesterday';
    }

    if (days >= 2 && days <= 6) {
        return `${days}d ${textAgo}`;
    }

    if (days >= 7 && days <= 13) {
        return '1w ${textAgo}';
    }

    return `${weeks}w ${textAgo}`;

}

const getPollTime = (pollExpiredAtString) => {
    const currentMoment = moment();
    const pollExpiredMoment = moment(pollExpiredAtString);
    const diff = pollExpiredMoment.diff(currentMoment);

    const diffInDays = pollExpiredMoment.diff(currentMoment, 'days');
    const diffInHours = pollExpiredMoment.diff(currentMoment, 'hours');
    const diffInMinutes = pollExpiredMoment.diff(currentMoment, 'minutes');

    // Poll still continues
    if (diff > 0) {
        if (diffInDays > 0) {
            return `${diffInDays}d left`;
        }
        if (diffInHours > 0) {
            return `${diffInHours}h ${diffInMinutes % 60}m left`;
        }
        return `${diffInMinutes % 60}m left`;

    }
    // Poll ended

    if (diffInDays < 0) {
        return `Poll closed ${Math.abs(diffInDays)}d ago`;
    }
    if (diffInHours > 0) {
        return `Poll closed ${Math.abs(diffInHours)}h ${Math.abs(
            diffInMinutes % 60,
        )}m ago`;
    }
    return `Poll closed ${Math.abs(diffInMinutes % 60)}m ago`;


};

const DateUtils = {
    formatPostDate,
    isPostExpired,
    dateAgo,
    getPollTime
}

export default DateUtils