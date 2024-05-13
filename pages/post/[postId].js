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

async function getServerReturnProps(userAgent, post, isDynamicLink) {
    if (!PostUtil.isPostPublic(post)) {
        let redirect = await RedirectUtils.redirectPrivatePost(userAgent, post)
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

export async function getServerSideProps(context) {
    const { postId } = context.query
    let userAgent = parser(context?.req?.headers['user-agent'])

    let isDynamicLink = postId?.length > 36
    let originalPostId = !isDynamicLink ? postId : postId?.substring(0, 36)

    console.log('date', new Date().valueOf())
    let post = await GetstreamSingleton.getInstance().getPostById(originalPostId)
    const returnResponse = await getServerReturnProps(userAgent, post, isDynamicLink)
    
    return new Promise((resolve) => {
        if(isDynamicLink) resolve(returnResponse)
        setTimeout(() => {
            resolve(returnResponse)
        }, 2000)
    })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDynamicLink])


    return <BaseContainer className="bg-black">
        <Helmet>
            <title>{`${post?.actor?.data?.username}: ${post?.message}`}</title>
        </Helmet>
        <PostComponent post={post} />
    </BaseContainer>
}