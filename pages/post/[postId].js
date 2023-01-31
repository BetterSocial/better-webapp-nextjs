import Constant from "utils/constant";
import DateUtils from "utils/date";
import GetstreamSingleton from "services/getstream";
import Image from "next/image";
import PostComponent from "component/Post";
import PostUtil from "utils/getstreamPost";
import RedirectUtils from "utils/redirect";
import parser from 'ua-parser-js'
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from "react-helmet";

export async function getServerSideProps(context) {
    const { postId } = context.query
    let userAgent = parser(context?.req?.headers['user-agent'])
    
    let post = await GetstreamSingleton.getInstance().getPostById(postId)

    if (!PostUtil.isPostPublic(post)) {
        let redirect = RedirectUtils.redirectPrivatePost(userAgent)
        if (redirect) return redirect
    }

    if (DateUtils.isPostExpired(post)) {
        let redirect = RedirectUtils.redirectExpiredPost(userAgent)
        if (redirect) return redirect
    }
    
    return {
        props: {
            post
        }
    }
}

/**
 * 
 * @param {PostByIdPageProps} param0 
 * @returns 
 */
export default function Post({ post }) {
    return <BaseContainer className="bg-black">
        <Helmet>
            <title>{`${post?.actor?.data?.username}: ${post?.message}`}</title>
        </Helmet>
        <PostComponent post={post} />
    </BaseContainer>
}