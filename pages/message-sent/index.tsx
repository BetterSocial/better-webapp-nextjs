import { BaseContainer } from "../../component/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React from "react";
import LayoutContainer from "../../component/LayoutContainer";
import Image from "next/image";


export default function MessageSent() {

    return <BaseContainer className="bg-black">
        <Helmet>
            <title>Human ID Verification</title>
        </Helmet>
        <LayoutContainer>
            <Image className="w-full" alt="verification image" src="/image/DynamicSuccessIllustration.svg" width={343} height={343} />
            <div className="pt-4 gap-y-2 flex flex-col">
                <text className="font-inter font-medium text-2xl">Your anonymous message has been sent!</text>
                <div className="rounded-lg rounded-t-xl flex flex-col">
                    <div className="flex flex-col text-base font-inter gap-4 mb-4">
                        <text className="font-inter font-semibold">Get the app to:</text>
                        <text className="font-inter">💬 See replies to your messages </text>
                        <text className="font-inter">🕵️‍♀️ Get your own anonymous messages! </text>
                        <text className="font-inter">🔔 See what’s new in your school or community</text>
                    </div>
                    <button className="shadow-3xl w-full bg-cyan hover:bg-cyan10 text-white font-lato flex py-2 px-4 rounded-lg justify-center items-center gap-2 text-justify">
                        Download BetterSocial Now
                    </button>
                </div>
            </div>
        </LayoutContainer>
    </BaseContainer>
}