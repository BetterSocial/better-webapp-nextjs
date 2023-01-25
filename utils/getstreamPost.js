import Constant from "utils/constant"

/**
 * 
 * @param {GetstreamPost} post 
 * @returns 
 */
const isPostPublic = (post) => {
    return post?.privacy === Constant.GetstreamPost.privacy.public
}

const PostUtil = {
    isPostPublic
}

export default PostUtil