import BetterSocialIcon from "component/Brand/BetterSocialIcon";
import { BaseContainer } from "component/Page/BaseContainer";
import { Helmet } from "react-helmet";

export default function Post() {
    return <BaseContainer>
        <div className='flex flex-col justify-center items-center'>
            <Helmet>
                <title>The post has expired and has been deleted automatically</title>
            </Helmet>
            <BetterSocialIcon />
            <h1>The post has expired and has been deleted automatically</h1>
        </div>
        
    </BaseContainer>
}