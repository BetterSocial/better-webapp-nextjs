import getConfig from 'next/config'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const { publicRuntimeConfig } = getConfig()

const Header = () => {
    const toDownloadLink = () => window.open(publicRuntimeConfig.DOWNLOAD_BETTERSOCIAL_APP_URL, '_blank')
    
    return (
        <div className="flex w-full justify-between items-center min-h-[45px]">
            <Image onClick={() => toDownloadLink()} alt="logo bettersocial" src="/image/LogoBrand.svg" width={107} height={28} />
            <button onClick={() => toDownloadLink()} className="text-white border px-4 py-2 rounded-lg font-semibold text-xs h-[34px]">Download App</button>
        </div>
    )
}

export { Header }