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

export default function Post({ post }) {
    return <BaseContainer>
        <PostComponent post={post} />
    </BaseContainer>
}