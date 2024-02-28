import Image from 'next/image';
import styles from 'styles/Home.module.css'
import { BaseContainer } from "component/Page/BaseContainer";

export function BannerPage({ link = '', bannerImage }) {
    return <BaseContainer>
        <div className='flex flex-col justify-center items-center'>
            <Image className="" src={'/image/better-icon.png'} width={100} height={100} />
            <Image className="mt-2 mb-12" src={'/image/better-icon.svg'} width={100} height={100} />
            <p className='font-inter sm:text-sm md:text-lg'>Helio is a Public Benefits Corporation -</p>
            <p className='font-inter sm:text-sm md:text-lg'>started to fix what Big Tech has broken, to protect</p>
            <p className='font-inter sm:text-sm md:text-lg'>your privacy, well being & freedom of speech.</p>
            <p className='font-inter sm:text-sm md:text-lg mt-4'>Now, and in the future.</p>
            {bannerImage}
        </div>
    </BaseContainer>
}