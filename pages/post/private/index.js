import AndroidBannerImage from "component/Brand/AndroidBannerImage";
import BetterSocialIcon from "component/Brand/BetterSocialIcon";
import IOSBannerImage from "component/Brand/IOSBannerImage";
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from "react-helmet";

export default function Post() {
    return <BaseContainer>
        <div className='flex flex-col justify-center items-center'>
            <Helmet>
                <title>You cannot access this private post. Login to the app via Play Store or App Store</title>
            </Helmet>
            <BetterSocialIcon />
            <h1>You cannot access this private post. Login to the app via Play Store or App Store</h1>
            <div className="flex flex-row items-center mt-12">
                <AndroidBannerImage />
                <IOSBannerImage />
            </div>
        </div>

    </BaseContainer>
}