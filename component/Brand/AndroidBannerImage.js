import Image from "next/image";

export default function AndroidBannerImage() {
    return <a className="w-48" target="_blank" rel="noopener noreferrer"
        href='https://play.google.com/store/apps/details?id=org.bettersocial&utm_campaign=sharedpost&utm_medium=Android'>
        <Image alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
            className="w-48"
            width={480}
            height={200} />
    </a>
}