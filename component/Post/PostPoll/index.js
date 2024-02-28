import Constant from 'utils/constant'
import DateUtils from 'utils/date'
import Dot from 'component/Dot'
import PollOption from 'component/Post/PostPoll/PollOptionSingle'
import PollOptionMultiple from 'component/Post/PostPoll/PollOptionMultiple'
import React from 'react'
import usePostHook from 'hooks/post/usePostHook'

/**
 * 
 * @param {PostComponentProps} param0 
 * @returns {React.ReactNode}
 */
export default function PostPoll({ post }) {
    const { postWithMostVote } = usePostHook(post)

    if (post?.post_type !== Constant.GetstreamPost.postType.poll) return <></>
    return <div className='flex flex-col w-full p-4'>
        {post?.pollOptions?.map((item, index) => {
            if (post?.multiplechoice) return <PollOptionMultiple key={index}
                pollOption={item}
                isPollClosed={DateUtils.isPollExpired(post)}
                totalVote={post?.voteCount}
                isMaxVote={postWithMostVote?.id === item?.polling_option_id} />

            return <PollOption key={index}
                pollOption={item}
                isPollClosed={DateUtils.isPollExpired(post)}
                totalVote={post?.voteCount}
                isMaxVote={postWithMostVote?.id === item?.polling_option_id} />
        })}
        <div className='flex flex-row w-full items-center mt-2'>
            <p className='text-sm font-light'>{post?.voteCount} votes</p>
            <Dot />
            <p className='text-sm font-light'>{DateUtils.getPollTime(post?.polls_expired_at)}</p>
            {/* <p className='text-primaryBlue flex-1 text-end'>See Results</p> */}
        </div>

        <p className='bg-primaryBlue text-sm text-white text-center p-2 px-4 rounded-md mt-4'>Download Helio Now to vote, comment and create your own posts!</p>
    </div>
}