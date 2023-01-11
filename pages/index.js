import Image from 'next/image';
import React from 'react'
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from 'react-helmet';

export default function BannerPage({ }) {
  return <BaseContainer>
    <Helmet>
      <title>Better Social</title>
    </Helmet>
    <div className='flex flex-col justify-center items-center'>
      <Image className="" src={'/image/better-icon.png'} width={100} height={100} />
      <Image className="mt-2 mb-12" src={'/image/better-icon.svg'} width={100} height={100} />
    </div>
  </BaseContainer>
}