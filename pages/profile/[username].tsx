import { BaseContainer } from "@components/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React, { useEffect, useRef, useState } from "react";
import LayoutContainer from "@components/LayoutContainer";
import Image from "next/image";
import { Header } from "@components/Header";
import Toggle from 'react-toggle'
import { useRouter } from "next/router";
import {  MessageEnum } from "@shared/enum";
import { GetServerSidePropsContext } from "next";
import { toast } from "react-toastify";
import { useGetProfile } from "@services/profile/profileHooks";
import { LoaderWrapper } from "@components/LoaderWrapper";
import useToastHook from "@hooks/toast/useToastHook"
import getConfig from "next/config";

interface PageProps {
    username?: string
}

const { publicRuntimeConfig } = getConfig()

export default function Profile(props: PageProps) {
    const { data, isLoading } = useGetProfile(props.username);
    const [message, setMessage] = useState('')
    const router = useRouter();
    useEffect(() => {
        if (data) {
            localStorage.setItem(MessageEnum.targetUser, data.user_id);
        }
    }, [data])

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const adjustTextareaHeight = () => {
        if (textAreaRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textAreaRef.current).lineHeight);
            textAreaRef.current.style.height = `${lineHeight}px`;
            const lines = Math.floor(textAreaRef.current.scrollHeight / lineHeight);
            const numLines = lines <= 3 ? lines : 3;
            textAreaRef.current.style.height = `${numLines * lineHeight}px`;
        }
    };

    const { copyToClipboardToast } = useToastHook()

    const showDownloadToast = () => toast('Download the BetterSocial app now to create a profile and send incognito messages', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
        closeButton: false,
        style: {
            borderRadius: '8px',
            width: '270px',
            margin: 'auto',
            marginBottom: '60px',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
        },
    })

    const onShareButtonClicked = () => {
        navigator.clipboard.writeText(`${publicRuntimeConfig.DYNAMIC_LINK_DOMAIN}/u/${props.username}`)
        copyToClipboardToast()
    }

    useEffect(() => {
        const handleScroll = () => {
                window.scrollTo(0, 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <BaseContainer className="bg-black">
            <Helmet>
                <title>{`${data?.username || ''}'s profile`}</title>
            </Helmet>
            <LayoutContainer backgroundImage="/image/background-profile.svg">
                <Header />
                <div className="flex flex-1-0-0 w-full justify-center items-center z-50">
                    {/* Card Header */}
                    <LoaderWrapper isLoading={isLoading}>
                        <div className="flex w-full bg-white p-4 rounded-2xl flex-col gap-4 h-max">
                            <div className="flex flex-row gap-4 items-center w-full justify-between">
                                <div className="flex flex-row gap-3 items-center" onClick={() => showDownloadToast()}>
                                    <div>
                                        <Image className="rounded-full h-10 w-10" src={data?.profile_pic_path} alt='profile pic' width={40} height={40} />
                                    </div>
                                    <div className="flex flex-col">
                                        <text className="font-semibold text-base">{data?.username}</text>
                                        <text className="font-medium text-sm text-gray06">{data?.follower_symbol} Followers</text>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <button className="border border-gray02 h-10 w-10 rounded-lg flex justify-center items-center" onClick={() => showDownloadToast()}>
                                        <Image src='/image/Icon_Follow.svg' alt='follow icon' width={15.81} height={20} />
                                    </button>
                                    <button className="border border-gray02 h-10 w-10 rounded-lg flex justify-center items-center" onClick={() => onShareButtonClicked()}>
                                        <Image src='/image/Icon_Share.svg' alt='share icon' width={20} height={20} />
                                    </button>
                                </div>
                            </div>
                            {/* Horizontal Devider */}
                            <div className="border-t border-gray02" />
                            {/* Card Content */}
                            <div>
                                <text className="font-normal text-sm">{data?.bio ?? ''}</text>
                            </div>
                        </div>
                    </LoaderWrapper>
                </div>
                {/* Input Message */}
                {!isLoading && <div className={data?.allow_anon_dm ? "w-full bg-white md:max-w-M lg:max-w-M xl:max-w-M p-2 fixed bottom-0 flex flex-row gap-[6px] z-[9999]" : "max-w-[375px] p-2 mb-4 bg-gray05 fixed bottom-0 flex flex-row gap-[6px] rounded-lg z-[9999]"}>
                    <Image className="rounded-full" src='/image/anonIcon.svg' alt="anon icon" width={24} height={24} />
                    {data?.allow_anon_dm ? (
                        <>
                            <div className="flex flex-grow items-ce bg-gray05 rounded-xl py-1 px-2 items-center">
                                <textarea ref={textAreaRef} rows={1} onChange={(e) => {
                                    setMessage(e.target.value)
                                }} className="bg-transparent min-h-[24px] w-full"
                                    style={{ resize: 'none' }}
                                    placeholder="Send me a message 😀" />
                                <Toggle
                                    checked={true}
                                    className="bg-white"
                                    defaultChecked={true}
                                    onClick={() => showDownloadToast()}
                                    icons={{
                                        checked: <text className="text-xs font-normal text-cyan leading-[18px]">On</text>,
                                        unchecked: null,
                                    }}
                                />
                            </div>
                            <button className="rounded-full flex-shrink-0 bg-cyan h-8 w-8 flex items-center justify-center" onClick={() => {
                                localStorage.setItem(MessageEnum.tempMessage, message);
                                router.push('/verification')
                            }}>
                                <Image src='/image/sendMessageicon.svg' alt="icon send" width={32} height={32} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-grow bg-gray05 rounded-xl py-1 px-2">
                                <div className="min-h-[24px] w-[230px] text-sm">
                                This user does not want to receive incognito messages.
                                </div>
                            </div>
                        </>
                    )}
                </div>}
            </LayoutContainer>
        </BaseContainer>
    )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    const { username } = context.query; // Retrieve the URL parameter from context.query

    return {
        props: {
            username,
        },
    };
};