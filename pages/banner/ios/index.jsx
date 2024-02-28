import Image from "next/image"
import styles from 'styles/Home.module.css'
import { BannerPage } from "component/Page/BannerPage"
import { Helmet } from "react-helmet"

export default function IOSBanner(props) {
    const bannerImage = <a href='https://apps.apple.com/us/app/better-social/id1615684520' target="_blank" rel="noreferrer">
        <Image className="w-48 mt-12" src="/image/app_store_badge.svg" alt="Download on the App Store" width="480" height="200" />
    </a>

    return <>
        <Helmet>
            <title>Helio - Download on the App Store</title>
        </Helmet>
        <BannerPage bannerImage={bannerImage} />
    </>
}