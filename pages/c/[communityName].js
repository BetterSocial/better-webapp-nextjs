import Constant from "utils/constant";
import RedirectUtils from "utils/redirect"
import UserAgentUtils from "utils/userAgent"
import parser from 'ua-parser-js';
import { useEffect } from "react"
import { useRouter } from "next/router"

export async function getServerSideProps(context) {
    const { communityName } = context.query
    let isDynamicLink = communityName?.indexOf('+') >= 0
    let userAgent = parser(context?.req?.headers['user-agent'])
    
    if (UserAgentUtils.isMobile(userAgent)) {
        let redirect = await RedirectUtils.redirectCommunityForMobileDevice(userAgent, communityName)
        if (redirect && !isDynamicLink) return redirect
    }

    if(UserAgentUtils.isIos(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.appstore,
            }
        }
    }

    if(UserAgentUtils.isAndroid(userAgent)) {
        return {
            redirect: {
                destination: Constant.Link.playstore,
            }
        }
    }

    return {
        redirect: {
            destination: Constant.Link.bettersocial,
        }
    }
}

export default function CommunityPage({ communityName, isDynamicLink }) {
    const router = useRouter()
    useEffect(() => {
        if (isDynamicLink) router.push(`/community/${communityName}`, undefined, { shallow: true })
    }, [isDynamicLink])

    return <>{communityName}</>
}