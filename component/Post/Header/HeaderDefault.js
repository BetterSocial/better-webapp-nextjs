import DateUtils from "utils/date";
import Dot from "component/Dot";
import HeaderInfo from "component/Post/Header/HeaderInfo";
import IconPublicPostSvg from "assets/icon/svg/IconPublicPostSvg";
import Image from "next/image";
import useToastHook from "hooks/toast/useToastHook";

/**
 * 
 * @param {PostComponentProps} props 
 * @returns 
 */
export function HeaderDefault(props) {
    const { post } = props;

    const { betterFullFunctionalityToast } = useToastHook()

    return <div className="flex flex-row w-full p-4 cursor-pointer" onClick={betterFullFunctionalityToast}>
        <Image
            className="ml-2 rounded-full"
            src={post?.actor?.data?.profile_pic_url}
            width={48} height={48}
            alt={post?.actor?.data?.username} />
        <HeaderInfo post={post} />
    </div>
}