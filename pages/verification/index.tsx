import { BaseContainer } from "@components/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React from "react";
import LayoutContainer from "@components/LayoutContainer";
import Image from "next/image";
import api from "@shared/fetcher";
import { useCheckExchangeTokenMutation } from "@services/auth/authHooks";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";
import { ITokenEnum, MessageEnum, UserEnum } from "@shared/enum";
import { useInitChatAnonymousMutation } from "@services/initChatAnonymous/initChatAnonymousHooks";
import { toast } from 'react-toastify'
import getConfig from "next/config";

interface PageProps {
    exchangeToken?: string
    isSendMessage?: boolean
    isFailedVerify?: boolean
}

const { publicRuntimeConfig } = getConfig();

export default function Verification(props: PageProps) {
    const router = useRouter();
    const exchangeToken = useCheckExchangeTokenMutation();
    const initChatAnon = useInitChatAnonymousMutation();
    const getLoginPage = () => {
        fetch('/api/getWebLogin').then(async (res) => {
            toast('Redirecting to humanID login page', {
                autoClose: false,
                type: 'info',
            })
            const data = await res.json();
            if (data.data?.webLoginUrl) {
                router.push(data.data?.webLoginUrl)
            }
        })
    }

    React.useEffect(() => {
        const member = localStorage.getItem(UserEnum.userId);
        const message = localStorage.getItem(MessageEnum.tempMessage);
        if (!!props.exchangeToken && props.isSendMessage && !props.isFailedVerify) {
            toast('Verifying your data', {
                autoClose: 3000,
                type: 'info',
            })
            exchangeToken.mutate({ exchangeToken: props.exchangeToken }, {
                onSuccess: (data) => {
                    if (data) {
                        Cookies.set(ITokenEnum.token, data?.token);
                        Cookies.set(ITokenEnum.refreshToken, data?.refresh_token);
                        Cookies.set(ITokenEnum.anonymousToken, data?.anonymousToken);
                        Cookies.set(UserEnum.humanId, data?.data.human_id);
                        Cookies.set(UserEnum.userId, data?.data.user_id);
                        api.defaults.headers.common['Authorization'] = `Bearer ${data.anonymousToken}`;
                        initChatAnon.mutate({
                            anon_user_info_color_code: '#000000',
                            anon_user_info_color_name: 'Anonymous',
                            anon_user_info_emoji_code: '😀',
                            anon_user_info_emoji_name: 'Grinning Face',
                            members: [member],
                            message: message,
                        }, {
                            onSuccess: (data) => {
                                if (data) {
                                    router.push('/message-sent');
                                }
                                localStorage.removeItem(MessageEnum.tempMessage);
                                localStorage.removeItem(MessageEnum.targetUser);
                            },
                            onError: (err) => {
                                console.error(err)
                                toast('Failed to send your message', {
                                    autoClose: 3000,
                                    type: 'error',
                                })
                            }
                        })
                    }
                },
                onError: (err) => {
                    console.error(err)
                    toast('Failed to verify your data', {
                        autoClose: 3000,
                        type: 'error',
                    })
                }
            })
        }
        if (props.isFailedVerify) {
            toast('Failed to verify humanID', {
                autoClose: 3000,
                type: 'error',
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BaseContainer className="bg-black">
            <Helmet>
                <title>Human ID Verification</title>
            </Helmet>
            <LayoutContainer>
                <div className="h-full flex flex-col justify-between">
                    <div className="flex-1-0-0 relative overflow-hidden rounded-2xl">
                        <img className="max-h-full w-full absolute object-cover" alt="verification image" src="/image/Verification_Illustration.svg"/>
                    </div>
                    <div className="pt-4 gap-y-2 flex flex-col h-min">
                        <text className="font-inter font-medium text-2xl text-justify">To send this message, please verify that you’re not a bot.</text>
                        <div className="border border-gray06 rounded-lg rounded-t-xl flex flex-col">
                            <button className="shadow-3xl" style={{
                                backgroundImage: `url('/image/humanID_bg_button.svg')`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: '45px',
                                borderRadius: '8px'
                            }} onClick={() => getLoginPage()} />
                            <div className="flex flex-col m-3">
                                <text className="text-center font-inter font-semibold">What is humanID?</text>
                                <text className="text-center font-normal text-gray06 text-base">Created by the <span className="text-foundationBlue" onClick={() => router.push(publicRuntimeConfig.HUMAN_INTERNET_URL)}>Foundation for a Human Internet</span>, humanID verifies that you’re not a bot without storing your data or sharing it with BetterSocial</text>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutContainer>
        </BaseContainer>
    );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    const query = context.query; // Retrieve the URL parameter from context.query

    return {
        props: {
            exchangeToken: query['sent_message?et'] || '',
            isSendMessage: !!query['sent_message?et'] || false,
            isFailedVerify: query['login_failed'] === '' || false,
        },
    };
};