import Image from "next/image";
import LayoutContainer from "@components/LayoutContainer";
import LinkableText from "@components/LinkableText/LinkableText";
import Toggle from 'react-toggle'
import getConfig from "next/config";
import useToastHook from "@hooks/toast/useToastHook"
import React, { useEffect, useRef, useState } from "react";
import { BaseContainer } from "@components/Page/BaseContainer";
import { BetterSocialEventTracking } from "analytics/analyticsEventTracking";
import { Header } from "@components/Header";
import { Helmet } from "react-helmet";
import { LoaderWrapper } from "@components/LoaderWrapper";
import { MessageEnum } from "@shared/enum";
import { PageProps } from "pages/[username]";
import { sendAnalytics } from "@services/analytics/analyticsServices";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig()

export default function ProfilePage(props: PageProps) {
    const {isDynamicLink, username, user} = props
    const [message, setMessage] = useState('')

    const windowRef = useRef(null)
    const inputMessageContainerRef = useRef(null)
    const localStorageHandlerRef = useRef(null)

    const data = user;

    const router = useRouter();
    useEffect(() => {
        if (data) {
            localStorage.setItem(MessageEnum.targetUserName, username);
            localStorage.setItem(MessageEnum.targetUser, data.user_id);
        }
    }, [data])

    useEffect(() => {
        if (isDynamicLink) router.push(`/${username}`, undefined, { shallow: true })
        sendAnalytics(BetterSocialEventTracking.PROFILE_SCREEN_OPEN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDynamicLink])

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const adjustTextareaHeight = () => {
        if (textAreaRef.current) {
            
            const {calculatedLineHeight, lineHeight, numLines} = getTextAreaHeight()
            textAreaRef.current.style.height = `${calculatedLineHeight}px`;

            if(message?.length > 0) {
                inputMessageContainerRef.current.style.top = getInputMessageContainerTopPosition() + 'px'
            }
        }
    };

    const { copyToClipboardToast } = useToastHook()

    const showDownloadToast = (eventName?: BetterSocialEventTracking) => {
        eventName && sendAnalytics(eventName)
        toast('Download the Helio app now to create a profile and send incognito messages', {
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
    }

    const onShareButtonClicked = () => {
        navigator.clipboard.writeText(`${publicRuntimeConfig.DYNAMIC_LINK_DOMAIN}/${username}`)
        copyToClipboardToast()
        sendAnalytics(BetterSocialEventTracking.PROFILE_SCREEN_SHARE_BUTTON_CLICKED)
    }

    const getTextAreaHeight = () => {
        const lineHeight = parseFloat(getComputedStyle(textAreaRef.current).lineHeight);
        let text = textAreaRef.current.value
        let linesRegex = text.split(/\r|\r\n|\n/);
        let count = linesRegex.length;
        const lines = count

        // const numLines = lines <= 4 ? lines : 4;
        const numLines = 4
        const calculatedLineHeight = numLines * lineHeight

        return {
            calculatedLineHeight,
            numLines,
            lineHeight
        }
    }

    const getContainerHeight = () => {
        return window.visualViewport.height === 0 ? window.innerHeight : window.visualViewport.height
    }

    const getInputMessageContainerTopPosition = () => {
        return getContainerHeight() + window.scrollY - 96 - 24
    }

    const calculateMessageInputPosition = () => {
        const messageInputHeightString = window.visualViewport.height === 0 ? '100dvh' : `${window.visualViewport.height}px`
        const fixedElementContainer = document.getElementById('fixed-element-container')
        const inputMessageContainer = document.getElementById('input-message-container')

        inputMessageContainer.style.top = getInputMessageContainerTopPosition() + 'px'
        
        // fixedElementContainer.style.height = messageInputHeightString
    }

    useEffect(() => {
        windowRef.current = window
        const handleScroll = () => {
            calculateMessageInputPosition()
        };

        const scrollToTop = () => {
            window.scrollTo(0,0)
            calculateMessageInputPosition()
        }
        
        const handleVisualViewportResize = () => {
            calculateMessageInputPosition()
            adjustTextareaHeight()
            window.scrollTo(0,0)
        }
        
        calculateMessageInputPosition()
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('DOMContentLoaded', scrollToTop)
        window.visualViewport.addEventListener('resize', handleVisualViewportResize)

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('DOMContentLoaded', scrollToTop)
            window.visualViewport.removeEventListener('resize', handleVisualViewportResize)
        };
    }, []);


    return (
        <>
        <BaseContainer className="bg-black">
            <Helmet>
                <title>{`${data?.username || ''}'s profile`}</title>
            </Helmet>
            <LayoutContainer backgroundImage="/image/background-profile.svg">
                <Header fixedPosition={false}/>
                <div className="flex flex-1-0-0 w-full justify-center" style={{
                    zIndex: 1000000
                }}>
                    {/* Card Header */}
                    <LoaderWrapper isLoading={false}>
                        <div className="flex w-full bg-grey210 p-4 rounded-2xl flex-col gap-4 h-max">
                            <div className="flex flex-row gap-4 items-center w-full justify-between">
                                <div className="flex flex-row gap-3 items-center" 
                                    onClick={() => showDownloadToast(BetterSocialEventTracking.PROFILE_SCREEN_SEE_PROFILE_BUTTON_CLICKED)}>
                                    <div>
                                        <Image className="rounded-full h-10 w-10" src={data?.profile_pic_path} alt='profile pic' width={40} height={40} />
                                    </div>
                                    <div className="flex flex-col">
                                        <text className="font-semibold text-base text-white">{data?.username}</text>
                                        <text className="font-medium text-sm text-grey410">{data?.follower_symbol} Followers</text>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <button className="border border-grey100 h-10 w-10 rounded-lg flex justify-center items-center" 
                                        onClick={() => showDownloadToast()}>
                                        <Image src='/image/Icon_Follow.svg' alt='follow icon' width={15.81} height={20} />
                                    </button>
                                    <button className="border border-grey100 h-10 w-10 rounded-lg flex justify-center items-center" onClick={() => onShareButtonClicked()}>
                                        <Image src='/image/Icon_Share.svg' alt='share icon' width={20} height={20} />
                                    </button>
                                </div>
                            </div>
                            {/* Horizontal Devider */}
                            <div className="border-t border-gray02" />
                            {/* Card Content */}
                            <div>
                                <LinkableText text={data?.bio}/>
                            </div>
                        </div>
                    </LoaderWrapper>
                </div>
            </LayoutContainer>
        </BaseContainer>
        {/* Input Message */}
        <iframe ref={localStorageHandlerRef} height={0} width={0} src={publicRuntimeConfig.LOCAL_STORAGE_HANDLER} />
        <div id="fixed-element-container" className="w-full md:max-w-M lg:max-w-M xl:max-w-M absolute left-1/2 -translate-x-1/2 top-0 pb-4 z-50" style={{
            transition: 'all 0.25s ease'
        }}>
            <div id='input-message-container' ref={inputMessageContainerRef} className={data?.allow_anon_dm ? `w-full bg-almostBlack md:max-w-M lg:max-w-M xl:max-w-M p-2 px-4 fixed flex flex-row gap-[6px] z-[9999]` : `max-w-[375px] p-2 mb-4 bg-gray05 fixed bottom-0 left-12 right-12 flex flex-row gap-[6px] rounded-lg z-[9999]`}>
                    {data?.allow_anon_dm ? (
                        <>
                            <Image className="rounded-full self-start" src='/image/anonIcon.svg' alt="anon icon" width={24} height={24} />
                            <div className="flex flex-grow items-ce bg-grey210 rounded-xl py-1 px-2 items-center">
                                <textarea ref={textAreaRef} autoFocus rows={4} onChange={(e) => {
                                    setMessage(e.target.value)
                                }} className="bg-transparent min-h-[48px] w-full resize align-top text-white"
                                    style={{ resize: 'none' }}
                                    placeholder="Send me a message 😀" />
                                <Toggle
                                    checked={true}
                                    className="bg-almostBlack self-start mt-1"
                                    defaultChecked={true}
                                    onClick={() => showDownloadToast()}
                                    icons={{
                                        checked: <text className="text-xs font-normal text-cyan leading-[18px]">On</text>,
                                        unchecked: null,
                                    }}
                                />
                            </div>
                            <button className="rounded-full flex-shrink-0 bg-cyan h-8 w-8 flex items-center justify-center self-start" onClick={() => {
                                localStorage.setItem(MessageEnum.tempMessage, message);
                                localStorageHandlerRef.current.contentWindow.postMessage({
                                    target_user_id: data.user_id,
                                    message: message
                                })
                                if(process.env.NODE_ENV === 'production') return router.push(`${publicRuntimeConfig.HELIO_SECURE_URL}/verification?target_user_id=${data?.user_id}&message=${message}`)
                                else return router.push(`/verification?target_user_id=${data?.user_id}&message=${message}`)
                            }}>
                                <Image src='/image/sendMessageicon.svg' alt="icon send" width={32} height={32} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-grow bg-gray05 rounded-xl py-1 px-2 justify-center">
                                <div className="min-h-[24px] w-[230px] text-sm text-center">
                                This user does not want to receive incognito messages.
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </div>
    </>
    )
}
