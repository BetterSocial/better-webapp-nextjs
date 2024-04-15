import ProfilePage from "@components/Page/Profile";
import React from "react";
import RedirectUtils from "utils/redirect";
import UserAgentUtils from "utils/userAgent";
import parser from 'ua-parser-js'
import { GetServerSidePropsContext } from "next";

export interface PageProps {
    username?: string
    isDynamicLink?: boolean
}

export default function Profile(props: PageProps) {
    return <ProfilePage {...props} />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { username } = context.query; // Retrieve the URL parameter from context.query
    let userAgent = parser(context?.req?.headers['user-agent'])

    let isDynamicLink = username?.indexOf('+') > -1
    let originalUsername = !isDynamicLink ? username : username?.slice(0, username?.length - 2)

    if (UserAgentUtils.isMobile(userAgent)) {        
        let redirect = await RedirectUtils.redirectUsernameForMobileDevice(userAgent, username)
        if (redirect && !isDynamicLink) return redirect
    }

    return {
        props: {
            username: originalUsername,
            isDynamicLink
        }
    }

};