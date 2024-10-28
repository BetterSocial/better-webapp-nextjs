import AdminMessageItem from "feature/admin-messages-list/AdminMessageItem"
import ChannelMessageFunction from "databases/functions/ChannelMessages"
import getConfig from "next/config"
import init from 'nextjs-basic-auth'
import useToastHook from "@hooks/toast/useToastHook"
import { AdminChannelMessage } from "types/Feature/AdminMessagesList/AdminMessageItem"
import { GetServerSidePropsContext } from "next"
import { getAllAdminMessages } from "@services/message/adminMessageService"
import { useRouter } from "next/router"
import { useState } from "react"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {serverRuntimeConfig} = getConfig()
    const {query} = context

    const users = [
        {user: serverRuntimeConfig.BETTER_BACKDOOR_ADMIN_USER, password: serverRuntimeConfig.BETTER_BACKDOOR_PASSWORD},
    ]

    const basicAuthCheck = init({
        users
    })

    await basicAuthCheck(context.req, context.res)

    const offset = query?.offset ? parseInt(query?.offset as string) : 0
    const channelMessages = await ChannelMessageFunction.adminGetChannelMessage(10, offset)
    
    return {
        props: {
            messages: channelMessages
        }
    }
}

export type AdminMessageScreenProps = {
    messages: AdminChannelMessage[]
}

const AdminMessagesScreen = (props: AdminMessageScreenProps) => {
    const [data, setData] = useState<AdminChannelMessage[]>(props?.messages)
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)
    const router = useRouter()
    const offset = router?.query?.offset as string

    const {noNewMessagesToast} = useToastHook()

    const loadMoreMessages = async() => {
        const response = await getAllAdminMessages(10, parseInt(offset || '10'))
        if(response?.data?.length === 0) return noNewMessagesToast()

        setData(data => [...data, ...response?.data])
        router.query.offset = response?.next?.toString()
        return router.replace({
            query: {
                ...router.query,
                offset: response?.next?.toString()
            }
        })
    }

    const onLoadMoreClicked = async() => {
        setIsLoadingMessages(true)
        await loadMoreMessages()
        setIsLoadingMessages(false)
    }

    return <div className="p-4">
        <p className="text-xl font-inter">Confessions List</p>
        <div className="flex flex-row flex-wrap w-full gap-3 mt-8">
        {data?.map((item) => {
            return <AdminMessageItem item={item} key={item?.message_id}/>
        })}
        </div>
        <button className="w-full bg-primaryBlue text-white px-4 py-4 rounded-md mt-8" onClick={() => onLoadMoreClicked()}>
            {isLoadingMessages ? 'Loading...' : 'Load More Messages'}
        </button>
    </div>
}

export default AdminMessagesScreen