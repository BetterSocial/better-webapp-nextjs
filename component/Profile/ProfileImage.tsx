import Image from "next/image"
import { ProfileImageComponentProps } from "types/Components/Profile/ProfileImage"

const ProfileImage = (props: ProfileImageComponentProps) => {
    const {
        url, 
        anon_user_info_color_code, 
        anon_user_info_color_name, 
        anon_user_info_emoji_code, 
        anon_user_info_emoji_name, 
        width = 48, 
        height = 48
    } = props

    if(anon_user_info_color_code) {
        return <div className={`rounded-full items-center justify-center`} style={{
            width,
            height,
            backgroundColor: anon_user_info_color_code
        }}><p className="text-center" style={{
            fontSize: width * 0.6
        }}>{anon_user_info_emoji_code}</p></div>
    }

    return <Image src={url} 
        alt={`image`} width={width} height={height} className="rounded-full"/> 
}

export default ProfileImage