import Cookies from "js-cookie";
import LayoutContainer from "@components/LayoutContainer";
import api from "@shared/fetcher";
import apiAnonymous from "@shared/fetcherAnonymous";
import getConfig from "next/config";
import React, { useState } from "react";
import { BaseContainer } from "@components/Page/BaseContainer";
import { GetServerSidePropsContext } from "next";
import { Helmet } from "react-helmet";
import { ITokenEnum, MessageEnum, UserEnum } from "@shared/enum";
import { LoaderWrapper } from "@components/LoaderWrapper";
import { toast } from 'react-toastify'
import { useCheckExchangeTokenMutation } from "@services/auth/authHooks";
import { useGenerateAnonUserInfoMutation } from "@services/generateAnonUserInfo/generateAnonUserInfoHooks";
import { useInitChatAnonymousMutation } from "@services/initChatAnonymous/initChatAnonymousHooks";
import { useRouter } from "next/router";

interface PageProps {
    exchangeToken?: string
    isSendMessage?: boolean
    isFailedVerify?: boolean
    targetUserId?: string
    message?: string
}

const { publicRuntimeConfig } = getConfig();

export default function Verification(props: PageProps) {
    const router = useRouter();
    const exchangeToken = useCheckExchangeTokenMutation();
    const generateAnonUser = useGenerateAnonUserInfoMutation();
    const initChatAnon = useInitChatAnonymousMutation();
    const [isLoading, setIsLoading] = useState(props.exchangeToken ? true : false)
    const getLoginPage = () => {
        fetch('/api/getWebLogin').then(async (res) => {
            toast('Sending you to humanID for verification', {
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
        if(props?.message) localStorage.setItem(MessageEnum.tempMessage, props?.message)
        if(props?.targetUserId) localStorage.setItem(MessageEnum.targetUser, props?.targetUserId)
            
        const member = localStorage.getItem(MessageEnum.targetUser);
        const message = localStorage.getItem(MessageEnum.tempMessage);
        if (!!props.exchangeToken && props.isSendMessage && !props.isFailedVerify) {
            toast('Receiving incognito identifier from humanID', {
                autoClose: 3000,
                type: 'info',
                progressStyle: {
                    background: '#4782D7'
                },
            })
            exchangeToken.mutate({ exchangeToken: props.exchangeToken }, {
                onSuccess: (data) => {
                    if (data) {
                        Cookies.set(ITokenEnum.token, data?.token);
                        Cookies.set(ITokenEnum.refreshToken, data?.refresh_token);
                        Cookies.set(ITokenEnum.anonymousToken, data?.anonymousToken);
                        Cookies.set(UserEnum.humanId, data?.data.human_id);
                        Cookies.set(UserEnum.userId, data?.data.user_id);
                        apiAnonymous.defaults.headers.common['Authorization'] = `Bearer ${data.anonymousToken}`;
                        generateAnonUser.mutate({ userId: localStorage.getItem(MessageEnum.targetUser) }, {
                            onSuccess: (data) => {
                                initChatAnon.mutate({
                                    anon_user_info_color_code: data.anon_user_info_color_code,
                                    anon_user_info_color_name: data.anon_user_info_color_name,
                                    anon_user_info_emoji_code: data.anon_user_info_emoji_code,
                                    anon_user_info_emoji_name: data.anon_user_info_emoji_name,
                                    member: member,
                                    message: message,
                                }, {
                                    onSuccess: (data) => {
                                        if (data) {
                                            setIsLoading(false);
                                            router.push('/message-sent');
                                        }
                                        localStorage.removeItem(MessageEnum.tempMessage);
                                        localStorage.removeItem(MessageEnum.targetUser);
                                    },
                                    onError: (err) => {
                                        setIsLoading(false);
                                        console.error(err)
                                        toast('We failed to send your message', {
                                            autoClose: 3000,
                                            type: 'error',
                                        })
                                    }
                                })
                            },
                            onError: (err) => {
                                setIsLoading(false);
                                console.error(err)
                                toast('We failed to send your message', {
                                    autoClose: 3000,
                                    type: 'error',
                                })
                            }
                        })
                    }
                },
                onError: (err) => {
                    setIsLoading(false);
                    console.error(err)
                    toast('humanID verification failed, please try again', {
                        autoClose: 3000,
                        type: 'error',
                    })
                }
            })
        }
        if (props.isFailedVerify) {
            toast('humanID verification failed, please try again', {
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
                    <LoaderWrapper isLoading={isLoading}>
                        <div className="flex-1-0-0 relative overflow-hidden rounded-2xl">
                            <img className="h-full w-full absolute object-cover" alt="verification image" src="/image/Verification_Illustration.svg" />
                        </div>
                        <div className="pt-4 gap-y-4 flex flex-col h-min">
                            <text className="font-inter font-medium text-2xl text-justify">To send this message, please verify that you’re not a bot.</text>
                            <div className="border border-gray06 rounded-lg rounded-t-xl flex flex-col">
                                <button className="shadow-3xl bg-humanId_blue" style={{
                                    margin: '-1px',
                                    backgroundImage: `url('/image/humanID_bg_button.svg')`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    height: '45px',
                                    borderRadius: '8px'
                                }} onClick={() => getLoginPage()} />
                                <div className="flex flex-col m-3">
                                    <text className="text-center font-inter font-semibold">What is humanID?</text>
                                    <text className="text-center font-normal text-gray06 text-base">Created by the <span className="text-foundationBlue" onClick={() => router.push(publicRuntimeConfig.HUMAN_INTERNET_URL)}>Foundation for a Human Internet</span>, humanID verifies that you’re not a bot without storing your data or sharing it with Helio</text>
                                </div>
                            </div>
                        </div>
                    </LoaderWrapper>
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
            targetUserId: query['target_user_id'] || null,
            message: query['message'] || null
        },
    };
};