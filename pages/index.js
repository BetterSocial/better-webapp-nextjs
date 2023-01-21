import BetterSocialIcon from 'component/Brand/BetterSocialIcon';
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
      <BetterSocialIcon />
    </div>
  </BaseContainer>
}