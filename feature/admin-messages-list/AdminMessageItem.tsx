import ProfileImage from "@components/Profile/ProfileImage";
import moment from "moment";
import useToastHook from "@hooks/toast/useToastHook";
import { AdminMessageItemComponentProps } from "types/Feature/AdminMessagesList/AdminMessageItem";

const AdminMessageItem = ({item}: AdminMessageItemComponentProps) => {
    const {copyAdminMessageToClipboardToast} = useToastHook()

    const copyMessageToClipboard = () => {
        navigator.clipboard.writeText(item?.message)
        copyAdminMessageToClipboardToast()
    }
    
    return <div className="border-gray-300 border-2 rounded-lg p-6 sm:w-full w-[48%] bg-primaryBlue cursor-pointer"
        onClick={copyMessageToClipboard}>
        <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center">
                <ProfileImage url={item?.target_profile_pic} />
                <p className="text-white font-semibold ml-2 text-lg">{item?.target_username}</p>
            </div>
            <p className="mx-4 text-center text-gray-100 font-extrabold text-2xl">{`⬅️`}</p>
            <div className="flex flex-row items-center">
                <p className="text-white font-semibold mr-2 text-lg">{item?.sender_is_anonymous ? `${item?.sender_anon_user_info_color_name} ${item?.sender_anon_user_info_emoji_name}` : item?.sender_username}</p>
                <ProfileImage url={item?.sender_profile_pic}
                    anon_user_info_color_code={item?.sender_anon_user_info_color_code}
                    anon_user_info_color_name={item?.sender_anon_user_info_color_name}
                    anon_user_info_emoji_code={item?.sender_anon_user_info_emoji_code}
                    anon_user_info_emoji_name={item?.sender_anon_user_info_emoji_name} />
            </div>
        </div>
        <div className="flex min-h-32 bg-gray-100 mt-4 rounded-md items-center justify-center">
            <p className="font-inter text-lg font-bold text-center text-primaryBlue">{item.message}</p>
        </div>
        <p className="text-white text-center mt-2 text-sm">🗓️ {moment(item?.created_at).format('dddd DD-MM-YYYY HH:mm')}</p>
    </div>
}

export default AdminMessageItem