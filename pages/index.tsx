import BetterSocialIcon from 'component/Brand/BetterSocialIcon';
import Constant from 'utils/constant';
import React from 'react'
import UserAgentUtils from 'utils/userAgent'
import getConfig from 'next/config';
import parser from 'ua-parser-js';
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from 'react-helmet';

export function getServerSideProps(context) {
  const { publicRuntimeConfig: config } = getConfig();
  const { postId, postPrivateId, postExpired, communityName, username } = context?.query || {}
  const userAgent = parser(context?.req?.headers['user-agent'])

  if(communityName) return {
    redirect: {
      destination: Constant.Link.bettersocial,
    }
  }
  
  if (postId) return {
    redirect: {
      destination: `/post/${postId}`,
    }
  }


  if(username) return {
    redirect: {
      destination: `/${username}+`
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
    props: {},
    redirect: {
      destination: config.WIX_URL,
    },
  }

}

export default function BannerPage({ }) {
  return <BaseContainer>
    <Helmet>
      <title>Helio</title>
    </Helmet>
    <div className='flex flex-col justify-center items-center'>
      <BetterSocialIcon />
    </div>
  </BaseContainer>
}