import Message from "component/Post/Message";
import PostImage from "component/Post/PostImage";
import PostNewsLink from "component/Post/PostNewsLink";
import PostPoll from "component/Post/PostPoll";
import React from "react";
import TopicChip from "component/Post/TopicChip";
import usePostHook from "hooks/post/usePostHook";

/**
 * 
 * @param {ContentProps} param0 
 */
export default function Content({ post }) {
    const { topicNotInMessage } = usePostHook(post)
    return <div className="flex flex-col flex-1 w-full justify-center items-center px-4">
        <Message post={post} />
        <PostNewsLink post={post} />
        <PostPoll post={post} />
        <PostImage post={post} />
        <div className="flex flex-row gap-1">
            {topicNotInMessage?.map((item, index) => {
                return <TopicChip topic={item} key={index} />
            })}
        </div>
    </div>
}