import DateUtils from "utils/date";
import GetstreamSingleton from "services/getstream";
import Image from "next/image";
import PostComponent from "component/Post";
import PostUtil from "utils/getstreamPost";
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from "react-helmet";

export async function getServerSideProps(context) {
    const { postId } = context.query
    let post = await GetstreamSingleton.getInstance().getPostById(postId)

    console.log('post')
    console.log(post)

    if (!PostUtil.isPostPublic(post)) {
        return {
            redirect: {
                destination: `/post/private`,
            }
        }
    }

    if (DateUtils.isPostExpired(post)) {
        return {
            redirect: {
                destination: '/post/expired',
            }
        }
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
    return <BaseContainer>
        <Helmet>
            <title>{`${post?.actor?.data?.username}: ${post?.message}`}</title>
        </Helmet>
        <PostComponent post={post} />
    </BaseContainer>
}