import Constant from 'utils/constant'
import CredderRatingNewsLinkHeader from 'component/Credder/CredderRatingNewsLinkHeader'
import DateUtils from 'utils/date'
import Dot from 'component/Dot'
import React from 'react'
import useToastHook from 'hooks/toast/useToastHook'

/**
 * 
 * @param {PostComponentProps} param0 
 */
export default function PostNewsLink({ post }) {
    const { betterFullFunctionalityToast } = useToastHook()

    if (post?.post_type !== Constant.GetstreamPost.postType.link) return <></>

    return <div className='flex flex-col items-center border-black border-solid border w-full rounded-md' onClick={betterFullFunctionalityToast}>
        <div className='flex flex-row justify-start items-center w-full cursor-pointer'>
            <img src={post?.og?.domainImage} alt={post?.data?.title}
                className="h-8 w-8 object-contain border rounded-full ml-6 my-2" />
            <p className='font-inter font-bold ml-4 text-sm'>{post?.og?.domain}</p>
            <Dot />
            <p className='font-inter text-sm font-light'>{DateUtils.formatPostDate(post?.time)}</p>
            <Dot />
            <CredderRatingNewsLinkHeader rating={post?.credderScore} />
        </div>
        <p className='font-inter font-bold mx-6 mb-4 cursor-pointer'>{post?.og?.title}</p>
        <img src={post?.og?.image} alt={post?.og?.title || ''}
            className="w-full h-48 object-cover cursor-pointer" />
        <p className='font-inter font-light mx-6 mb-2 mt-4 cursor-pointer'>
            {`${post?.og?.description} `}
            <span className='font-inter font-medium text-blue-500 underline'>
                <a href={post?.og?.url}
                    target="_blank" rel="noreferrer">Open Link
                </a>
            </span>
        </p>
    </div>
}

