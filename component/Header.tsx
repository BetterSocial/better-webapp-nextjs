import getConfig from 'next/config'
import Image from 'next/image'
import React from 'react'

const { publicRuntimeConfig } = getConfig()

const Header = () => {
    return (
        <div className="flex w-full justify-between items-center min-h-[45px]">
            <Image alt="logo bettersocial" src="/image/LogoBrand.svg" width={107} height={28} />
            <button onClick={() => window.location.href = publicRuntimeConfig.DOWNLOAD_BETTERSOCIAL_APP_URL} className="text-white border px-4 py-2 rounded-lg font-semibold text-xs h-[34px]">Download App</button>
        </div>
    )
}

export { Header }