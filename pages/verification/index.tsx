import { BaseContainer } from "../../component/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React from "react";
import LayoutContainer from "../../component/LayoutContainer";
import Image from "next/image";

export default function Verification() {
    return (
        <BaseContainer className="bg-black">
            <Helmet>
                <title>Human ID Verification</title>
            </Helmet>
            <LayoutContainer>
                <div className="flex flex-1-0-0 w-full">
                    <Image className="w-full" alt="verification image" src="/image/Verification_Illustration.svg" width={343} height={343}  layout="responsive"
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
                        }} />
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