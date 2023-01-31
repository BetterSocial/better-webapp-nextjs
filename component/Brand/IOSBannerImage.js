import Constant from "utils/constant";
import Image from "next/image";

export default function IOSBannerImage() {
    return <a href={Constant.Link.appstore} target="_blank" rel="noreferrer">
        <Image className="w-40" src="/image/app_store_badge.svg" alt="Download on the App Store" width="480" height="200" />
    </a>
}