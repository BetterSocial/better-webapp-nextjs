import reactStringReplace from 'react-string-replace'
import useToastHook from 'hooks/toast/useToastHook'

/**
 * 
 * @param {GetstreamPost} post 
 */
const usePostHook = (post) => {
    const { betterFullFunctionalityToast } = useToastHook()

    const topicRegex = /\B(\#[a-zA-Z0-9_+-]+\b)(?!;)/
    const messageTopics = reactStringReplace(post?.message, topicRegex, (match, i) => (
        <span key={i} className="text-primaryBlue" style={{ color: '#2f80ed', cursor: 'pointer' }} onClick={betterFullFunctionalityToast}>{match}</span>
    ))

    const topicNotInMessage = post?.topics?.filter((item) => {
        return post?.message?.indexOf(`#${item}`) === -1
    })

    const postWithMostVote = post?.pollOptions?.reduce((acc, current) => {
        if (acc?.voteCount >= current?.counter) return acc
        return { id: current?.polling_option_id, voteCount: current?.vote }
    }, { id: null, voteCount: 0 })

    const countCommentAllLevel = 0

    return {
        post,
        messageTopics,
        topicNotInMessage,
        postWithMostVote,
        countCommentAllLevel
    }
}

export default usePostHook