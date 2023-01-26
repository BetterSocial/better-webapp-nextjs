import Message from "component/Post/Message";
import React from "react";
import TopicChip from "component/Post/TopicChip";
import usePostHook from "hooks/post/usePostHook";

/**
 * 
 * @param {ContentProps} param0 
 */
export default function Content({ post }) {
    const { topicNotInMessage } = usePostHook(post)
    return <div className="flex flex-col h-full w-full justify-center items-center">
        <Message post={post} />
        {topicNotInMessage?.map((item, index) => {
            return <TopicChip topic={item} key={index} />
        })}
    </div>
}