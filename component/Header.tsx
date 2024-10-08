import Image from 'next/image'
import React from 'react'
import getConfig from 'next/config'
import { BetterSocialEventTracking } from 'analytics/analyticsEventTracking'
import { sendAnalytics } from '@services/analytics/analyticsServices'

const { publicRuntimeConfig } = getConfig()

const Header = ({fixedPosition = true}) => {
    const toDownloadLink = () => {
        sendAnalytics(BetterSocialEventTracking.PROFILE_SCREEN_DOWNLOAD_APP_BUTTON_CLICKED)
        window.open(publicRuntimeConfig.DOWNLOAD_BETTERSOCIAL_APP_URL, '_blank')
    }
    
    return (
        <div className={`flex w-full md:max-w-M lg:max-w-M xl:max-w-M justify-between items-center min-h-[45px] top-0 p-4 ${fixedPosition ? 'fixed' : ''}`}>
            <Image onClick={() => toDownloadLink()} alt="logo helio" src="/image/LogoBrand.svg" width={60} height={28} />
            <button onClick={() => toDownloadLink()} className="bg-primaryIncognito text-white px-4 py-2 rounded-lg font-semibold text-xs h-[34px]">Download App</button>
        </div>
    )
}

export { Header }