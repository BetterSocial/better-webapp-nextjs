import { BannerPage } from "component/Page/BannerPage"
import { Helmet } from "react-helmet"

export default function AndroidBanner(props) {
    const bannerImage = <a className="w-48 mt-12" target="_blank"
        href='https://play.google.com/store/apps/details?id=org.bettersocial&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
        <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
    </a>

    return <>
        <Helmet>
            <title>Better Social - Get it on Google Play</title>
        </Helmet>
        <BannerPage bannerImage={bannerImage} />
    </>
}