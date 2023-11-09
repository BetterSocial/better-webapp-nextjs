import { BaseContainer } from "../../component/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React from "react";
import LayoutContainer from "../../component/LayoutContainer";
import Image from "next/image";
import api from "../../shared/fetcher";
import { useCheckExchangeTokenMutation } from "../../services/auth/authHooks";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";
import { ITokenEnum } from "../../shared/enum";
import { useInitChatAnonymousMutation } from "../../services/initChatAnonymous/initChatAnonymousHooks";

interface PageProps {
    exchangeToken?: string
}

export default function Verification(props: PageProps) {
    const router = useRouter();
    const exchangeToken = useCheckExchangeTokenMutation();
    const initChatAnon = useInitChatAnonymousMutation();
    const getLoginPage = () => {
        fetch('/api/getWebLogin').then(async (res) => {
            const data = await res.json();
            if (data.data?.webLoginUrl) {
                window.location.href = data.data?.webLoginUrl;
            }
        })
    }

    React.useEffect(() => {
        const member = localStorage.getItem(ITokenEnum.userId);
        const message = localStorage.getItem(ITokenEnum.tempMessage);
        if (!!props.exchangeToken) {
            exchangeToken.mutate({ exchangeToken: props.exchangeToken }, {
                onSuccess: (data) => {
                    if (data) {
                        Cookies.set(ITokenEnum.token, data?.token);
                        Cookies.set(ITokenEnum.refreshToken, data?.refresh_token);
                        Cookies.set(ITokenEnum.anonymousToken, data?.anonymousToken);
                        Cookies.set(ITokenEnum.humanId, data?.data.human_id);
                        Cookies.set(ITokenEnum.userId, data?.data.user_id);
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
                                localStorage.removeItem(ITokenEnum.tempMessage);
                                localStorage.removeItem(ITokenEnum.targetUser);
                            },
                            onError: (err) => {
                                console.error(err)
                            }
                        })
                    }
                },
                onError: (err) => {
                    console.error(err)
                }
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
                <div className="flex flex-1-0-0 w-full">
                    <Image className="w-full" alt="verification image" src="/image/Verification_Illustration.svg" width={343} height={343} layout="responsive"
                        style={{ objectFit: 'none', height: 'auto', width: '100%' }} />
                </div>
                <div className="pt-4 gap-y-2 flex flex-col">
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
                            <text className="text-center font-normal text-gray06 text-base">Created by the <span className="text-foundationBlue">Foundation for a Human Internet</span>, humanID verifies that you’re not a bot without storing your data or sharing it with BetterSocial</text>
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
        },
    };
};