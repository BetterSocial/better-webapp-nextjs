import reactStringReplace from 'react-string-replace'

/**
 * 
 * @param {GetstreamPost} post 
 */
const usePostHook = (post) => {
    const topicRegex = /\B(\#[a-zA-Z0-9_+-]+\b)(?!;)/
    const messageTopics = reactStringReplace(post?.message, topicRegex, (match, i) => (
        <span key={i} className="text-primaryBlue" style={{ color: '#2f80ed' }}>{match}</span>
    ))

    const topicNotInMessage = post?.topics?.filter((item) => {
        return post?.message?.indexOf(`#${item}`) === -1
    })

    return {
        post,
        messageTopics,
        topicNotInMessage
    }
}

export default usePostHook