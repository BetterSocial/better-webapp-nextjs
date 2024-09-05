import LayoutContainer from "@components/LayoutContainer";
import React from "react";
import getConfig from "next/config";
import { BaseContainer } from "@components/Page/BaseContainer";
import { BetterSocialEventTracking } from "analytics/analyticsEventTracking";
import { Helmet } from "react-helmet";
import { MessageEnum } from "@shared/enum";
import { sendAnalytics } from "@services/analytics/analyticsServices";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig()

export default function MessageSent() {
    const router = useRouter();

    React.useEffect(() => {
        sendAnalytics(BetterSocialEventTracking.SUCCESS_SCREEN_OPEN)
    }, [])

    const onGoToProfileButtonClicked = () => {
        const usernameToBeRedirected = localStorage.getItem(MessageEnum.targetUserName)
        router.push(`/${usernameToBeRedirected}`)
    }

    return <BaseContainer className="bg-black">
        <Helmet>
            <title>Your message has been sent!</title>
        </Helmet>
        <LayoutContainer>
            <div className="h-full flex flex-col justify-between">
                <div className="flex-1-0-0 relative overflow-hidden rounded-2xl">
                    <img className="h-full w-full absolute object-cover" alt="verification image" src="/image/DynamicSuccessIllustration.svg" />
                </div>
                <div className="pt-4 gap-y-4 flex flex-col h-min">
                    <text className="font-inter font-medium text-2xl">Your incognito message has been sent!</text>
                    <div className="rounded-lg rounded-t-xl flex flex-col">
                        <div className="flex flex-col text-base font-inter gap-4 mb-4">
                            <text className="font-inter font-semibold">Get the app to:</text>
                            <text className="font-inter font-normal">💬 See replies to your messages </text>
                            <text className="font-inter font-normal">🕵️‍♀️ Get your own incognito messages! </text>
                            <text className="font-inter font-normal">🔔 See what’s new in your school or community</text>
                        </div>
                        <button onClick={onGoToProfileButtonClicked} className=" w-full bg-white hover:bg-cyan10 text-cyan hover:text-white border-cyan border-2 font-lato flex py-2 px-4 rounded-lg justify-center items-center gap-2 text-justify mb-2">
                            {`Back to ${localStorage.getItem(MessageEnum.targetUserName)}'s profile`}
                        </button>
                        <button onClick={() => router.push(publicRuntimeConfig.DOWNLOAD_BETTERSOCIAL_APP_URL)} className=" w-full bg-cyan hover:bg-cyan10 text-white font-lato flex py-2 px-4 rounded-lg justify-center items-center gap-2 text-justify mb-4">
                            Download Helio Now
                        </button>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    </BaseContainer>
}