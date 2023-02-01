import React from 'react'
import usePostHook from 'hooks/post/usePostHook'

/**
 * 
 * @param {GetstreamPost} param0 
 */
export default function Message({ post }) {
    const { post: defaultPost, messageTopics } = usePostHook(post)
    return <p className="font-inter m-4
        text-post leading-post 
        tracking-post font-normal line-clamp-3">{post?.message}</p>
}