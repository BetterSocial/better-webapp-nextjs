import Image from "next/image";

export default function IOSBannerImage() {
    return <a href='https://apps.apple.com/us/app/better-social/id1615684520?utm_campaign=sharedpost&utm_medium=iOS' target="_blank" rel="noreferrer">
        <Image className="w-40" src="/image/app_store_badge.svg" alt="Download on the App Store" width="480" height="200" />
    </a>
}