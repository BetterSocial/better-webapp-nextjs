import { BaseContainer } from "@components/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React from "react";
import LayoutContainer from "@components/LayoutContainer";
import Image from "next/image";
import getConfig from "next/config";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig()

export default function MessageSent() {
    const router = useRouter();
    return <BaseContainer className="bg-black">
        <Helmet>
            <title>Your message has been sent!</title>
        </Helmet>
        <LayoutContainer>
            <div className="flex flex-1-0-0 w-full">
                <Image className="w-full" alt="verification image" src="/image/DynamicSuccessIllustration.svg" width={343} height={343} layout="responsive"
                    style={{ objectFit: 'none', height: 'auto', width: '100%' }} />
            </div>
            <div className="pt-4 gap-y-2 flex flex-col">
                <text className="font-inter font-medium text-2xl">Your anonymous message has been sent!</text>
                <div className="rounded-lg rounded-t-xl flex flex-col">
                    <div className="flex flex-col text-base font-inter gap-4 mb-4">
                        <text className="font-inter font-semibold">Get the app to:</text>
                        <text className="font-inter font-normal">💬 See replies to your messages </text>
                        <text className="font-inter font-normal">🕵️‍♀️ Get your own anonymous messages! </text>
                        <text className="font-inter font-normal">🔔 See what’s new in your school or community</text>
                    </div>
                    <button onClick={() => router.push(publicRuntimeConfig.DOWNLOAD_BETTERSOCIAL_APP_URL)} className=" w-full bg-cyan hover:bg-cyan10 text-white font-lato flex py-2 px-4 rounded-lg justify-center items-center gap-2 text-justify">
                        Download BetterSocial Now
                    </button>
                </div>
            </div>
        </LayoutContainer>
    </BaseContainer>
}