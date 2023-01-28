import Constant from "utils/constant"
import { DomainPage, PollingOption, sequelize } from "databases/models"

/**
 * 
 * @param {GetstreamPost} post 
 * @returns 
 */
const isPostPublic = (post) => {
    return post?.privacy?.toLowerCase() === Constant.GetstreamPost.privacy.public.toLowerCase()
}

/**
 * 
 * @param {GetstreamPost} post 
 * @returns {GetstreamPost}
 */
const filterAnonymousData = (post) => {
    if (post?.anonimity) {
        post.to = []
        post.origin = null
        post.object = ""
        post.actor = {}
        post.actor.data = {
            username: Constant.String.anonymous
        }
    }

    return post
}

/**
 * 
 * @param {GetstreamPost} post 
 * @returns {GetstreamPost}
 */
const populatePollData = async (post) => {
    if (post?.verb !== Constant.GetstreamPost.postVerb.poll
        || post?.post_type !== Constant.GetstreamPost.postType.poll) return post

    let pollOptions = await getPollOptions(post)
    let voteCount = await getDistinctPollingByUserId(post)

    post.isalreadypolling = false
    post.mypolling = []
    post.pollOptions = pollOptions;
    post.voteCount = voteCount;

    return post;

    async function getDistinctPollingByUserId() {
        let distinctPollingByUserId = await sequelize.query(
            `SELECT DISTINCT(user_id) from public.log_polling 
                WHERE polling_id='${post?.polling_id}' 
                AND polling_option_id !='${Constant.GetstreamPost.poll.noPollOptionUuid}'`
        );
        return distinctPollingByUserId[0].length;
    }

    async function getPollOptions() {
        let pollOptions = await PollingOption.findAll({
            where: {
                polling_option_id: post?.polls,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            raw: true
        });

        return pollOptions
    }
}

/**
 * 
 * @param {GetstreamPost} post 
 * @returns {GetstreamPost}
 */
const populateCredderScore = async (post) => {
    if (post?.post_type !== Constant.GetstreamPost.postType.link) return post

    let domainPage = await DomainPage.findOne({
        where: { domain_page_id: post?.og?.domain_page_id },
        raw: true
    })

    post.credderScore = domainPage?.credder_score
    post.credderLastChecked = domainPage?.credder_last_checked

    return post
}

/**
 * 
 * @param {GetstreamPost} post 
 * @returns {GetstreamPost}
 */
const modifyPost = async (post) => {
    post = await filterAnonymousData(post)
    post = await populatePollData(post)
    post = await populateCredderScore(post)

    return post
}

const PostUtil = {
    isPostPublic,
    filterAnonymousData,
    populatePollData,
    populateCredderScore,
    modifyPost
}

export default PostUtil