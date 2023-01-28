import BasePollOption from 'component/Post/PostPoll/BasePollOption'
import IconPollWinnerBadge from 'assets/icon/svg/IconPollWinnerBadgeSvg'
import React from 'react'

/**
 * 
 * @param {PollOptionComponentProps} props 
 */
export default function PollOptionSingle(props) {
    return <BasePollOption {...props} isMultipleChoice={false} />
}