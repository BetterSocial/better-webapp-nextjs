import BetterSocialIcon from 'component/Brand/BetterSocialIcon';
import Image from 'next/image';
import React from 'react'
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from 'react-helmet';

export function getServerSideProps(context) {
  const { postId } = context?.query
  if (postId) {
    return {
      redirect: {
        destination: `/post/${postId}`,
      }
    }
  }

  return {
    props: {}
  }

}

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