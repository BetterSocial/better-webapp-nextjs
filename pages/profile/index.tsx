import { BaseContainer } from "../../component/Page/BaseContainer";
import { Helmet } from "react-helmet";
import React from "react";
import LayoutContainer from "../../component/LayoutContainer";
import Image from "next/image";
import { Header } from "../../component/Header";
import Toggle from 'react-toggle'
import { getPublicProfile } from "services/profile/profileServices";

export default function Profile() {
    const data = getPublicProfile('Yusufputra')
    return (
        <BaseContainer className="bg-black">
            <Helmet>
                <title>Profile!</title>
            </Helmet>
            <LayoutContainer backgroundImage="/image/background-profile.svg">
                <Header />
                <div className="flex flex-1-0-0 items-center">
                    <div className="flex w-full bg-white p-4 rounded-2xl flex-col gap-4 h-max">
                        {/* Card Header */}
                        <div className="flex flex-row gap-4 items-center w-full justify-between">
                            <div className="flex flex-row gap-3 items-center">
                                <div>
                                    <Image className="rounded-full" src='/image/exampleImage.jpeg' alt='profile pic' width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <text className="font-semibold text-base">ayaka_kaminari</text>
                                    <text className="font-medium text-sm text-gray06">234 Followers</text>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <button className="border border-gray02 h-10 w-10 rounded-lg flex justify-center items-center">
                                    <Image src='/image/Icon_Follow.svg' alt='follow icon' width={15.81} height={20} />
                                </button>
                                <button className="border border-gray02 h-10 w-10 rounded-lg flex justify-center items-center">
                                    <Image src='/image/Icon_Share.svg' alt='share icon' width={20} height={20} />
                                </button>
                            </div>
                        </div>
                        {/* Horizontal Devider */}
                        <div className="border-t border-gray02" />
                        {/* Card Content */}
                        <div>
                            <text className="font-normal text-sm">Lorem ipsum dolor sit amet consectetur. Ut odio donec urna cursus sit suspendisse sed. Proin ullamcorper tellus non tellus tortor enim quis mauris iaculis. Arcu est aliquet vestibulum sed. Vitae fringilla aliquam etiam sed et mattis tincidunt eros nullam. Convallis at sed pellentesque neque maecenas.</text>
                        </div>
                    </div>
                </div>
                {/* Input Message */}
                <div className="w-full p-2 bg-white fixed bottom-0 flex flex-row gap-[6px]">
                    <Image className="rounded-full h-fit pt-1" src='/image/anonIcon.svg' alt="anon icon" width={24} height={24} />
                    <div className="flex flex-grow bg-gray05 rounded-xl py-1 px-2">
                        <div contentEditable onInput={(e) => console.log(e.currentTarget.textContent)} className="bg-transparent min-h-[24px] w-[230px]" placeholder="Send a message..." />
                        <Toggle
                            checked={true}
                            className="bg-white"
                            defaultChecked={true}
                            icons={{
                                checked: <text className="text-xs font-normal text-cyan">On</text>,
                                unchecked: null,
                            }}
                        />
                    </div>
                    <button className="rounded-full flex-shrink-0 bg-cyan h-8 w-8 flex items-center justify-center">
                        <Image className="rounded-full" src='/image/planePaper.svg' alt="icon send" width={17} height={14} />
                    </button>
                </div>
            </LayoutContainer>
        </BaseContainer>
    )
}