import Constant from 'utils/constant'
import DateUtils from 'utils/date'
import Dot from 'component/Dot'
import PollOption from 'component/Post/PostPoll/PollOption'
import React from 'react'

/**
 * 
 * @param {PostComponentProps} param0 
 * @returns {React.ReactNode}
 */
export default function PostPoll({ post }) {
    if (post?.post_type !== Constant.GetstreamPost.postType.poll) return <></>

    return <div className='flex flex-col w-full p-4'>
        {post?.pollOptions?.map((item, index) => {
            return <PollOption key={index} pollOption={item} />
        })}
        <div className='flex flex-row w-full items-center mt-2'>
            <p className='text-sm font-light'>{post?.voteCount} votes</p>
            <Dot />
            <p className='text-sm font-light'>{DateUtils.getPollTime(post?.polls_expired_at)}</p>
            {/* <p className='text-primaryBlue flex-1 text-end'>See Results</p> */}
        </div>

        <p className='bg-primaryBlue text-sm text-white text-center p-2 rounded-md mt-4'>You can vote in apps. Get Better Social App Now</p>
    </div>
}