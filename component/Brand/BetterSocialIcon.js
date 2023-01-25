import Image from "next/image";

export default function BetterSocialIcon() {
    return <>
        <Image className="" src={'/image/better-icon.png'} width={100} height={100} />
        <Image className="mt-2 mb-12" src={'/image/better-icon.svg'} width={100} height={100} />
    </>
}