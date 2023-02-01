import Constant from "utils/constant";
import DateUtils from "utils/date";
import GetstreamSingleton from "services/getstream";
import Image from "next/image";
import PostComponent from "component/Post";
import PostUtil from "utils/getstreamPost";
import RedirectUtils from "utils/redirect";
import UserAgentUtils from "utils/userAgent";
import parser from 'ua-parser-js'
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const { postId } = context.query
    let userAgent = parser(context?.req?.headers['user-agent'])

    let isDynamicLink = postId?.length > 36
    let originalPostId = !isDynamicLink ? postId : postId?.substring(0, 36)

    let post = await GetstreamSingleton.getInstance().getPostById(originalPostId)

    if (!PostUtil.isPostPublic(post)) {
        let redirect = await RedirectUtils.redirectPrivatePost(userAgent)
        if (redirect) return redirect
    }

    if (DateUtils.isPostExpired(post)) {
        let redirect = await RedirectUtils.redirectExpiredPost(userAgent)
        if (redirect) return redirect
    }

    if (UserAgentUtils.isMobile(userAgent)) {
        let redirect = await RedirectUtils.redirectMobileDevice(userAgent, post)
        if (redirect && !isDynamicLink) return redirect
    }

    return {
        props: {
            post,
            isDynamicLink
        }
    }
}

/**
 * 
 * @param {PostByIdPageProps} param0 
 * @returns 
 */
export default function Post({ post, isDynamicLink }) {
    const router = useRouter()
    useEffect(() => {
        if (isDynamicLink) router.push(`/post/${post.id}`, undefined, { shallow: true })
    }, [isDynamicLink])


    return <BaseContainer className="bg-black">
        <Helmet>
            <title>{`${post?.actor?.data?.username}: ${post?.message}`}</title>
        </Helmet>
        <PostComponent post={post} />
    </BaseContainer>
}