import ChannelMessageFunction from "databases/functions/ChannelMessages"
import getConfig from "next/config"
import init from 'nextjs-basic-auth'
import { GetServerSidePropsContext } from "next"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {serverRuntimeConfig} = getConfig()

    const users = [
        {user: serverRuntimeConfig.BETTER_BACKDOOR_ADMIN_USER, password: serverRuntimeConfig.BETTER_BACKDOOR_PASSWORD},
    ]

    const basicAuthCheck = init({
        users
    })

    await basicAuthCheck(context.req, context.res)

    const channelMessages = ChannelMessageFunction.adminGetChannelMessage(10, 0)
    
    return {
        props: {
            messages: channelMessages
        }
    }
}

export type AdminMessageScreenProps = {
    messages: any[]
}

const AdminMessagesScreen = (props: AdminMessageScreenProps) => {
    return <>
        <p>Admin page screen</p>
        {props?.messages?.map((item) => {
            return <>
                <p>{item.channelId}</p>
                <p>{item.recipientUsername}</p>
                <p>{item.message}</p>
                <p>{item.sender_anon_user_info_color_code}</p>
                <p>{item.sender_anon_user_info_color_name}</p>
                <p>{item.sender_anon_user_info_emoji_code}</p>
                <p>{item.sender_anon_user_info_emoji_name}</p>
            </>
        })}
    </>
}

export default AdminMessagesScreen