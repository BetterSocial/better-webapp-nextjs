import BetterSocialIcon from 'component/Brand/BetterSocialIcon';
import Constant from 'utils/constant';
import Image from 'next/image';
import React from 'react'
import UserAgentUtils from 'utils/userAgent'
import parser from 'ua-parser-js';
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from 'react-helmet';

export function getServerSideProps(context) {
  const { postId, postPrivateId, postExpired } = context?.query
  const userAgent = parser(context?.req?.headers['user-agent'])
  if (postId) return {
    redirect: {
      destination: `/post/${postId}`,
    }
  }

  if (postExpired && UserAgentUtils.isAndroid(userAgent)) return {
    redirect: {
      destination: Constant.Link.playstore
    }
  }

  if (postExpired && UserAgentUtils.isIos(userAgent)) return {
    redirect: {
      destination: Constant.Link.appstore
    }
  }

  if (postPrivateId && UserAgentUtils.isAndroid(userAgent)) return {
    redirect: {
      destination: Constant.Link.playstore
    }
  }

  if (postPrivateId && UserAgentUtils.isIos(userAgent)) return {
    redirect: {
      destination: Constant.Link.appstore
    }
  }

  if (postPrivateId) return {
    redirect: {
      destination: Constant.Link.bettersocial
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