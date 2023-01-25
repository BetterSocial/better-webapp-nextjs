import DateUtils from "utils/date";
import Dot from "component/Dot";
import IconPublicPostSvg from "assets/icon/svg/IconPublicPostSvg";
import Image from "next/image";

/**
 * 
 * @param {PostComponentProps} props 
 * @returns 
 */
export function Header(props) {
    const { post } = props;
    return <div className="flex flex-row w-full p-4">
        <Image
            className="ml-2 rounded-full"
            src={post?.actor?.data?.profile_pic_url}
            width={48} height={48}
            alt={post?.actor?.data?.username} />
        <div className="flex flex-col ml-2 flex-1">
            <p className="font-inter font-bold">{post?.actor?.data?.username}</p>
            <div className="flex flex-row">
                <p className="font-inter text-sm">{DateUtils.formatPostDate(post?.time)}</p>
                <Dot />
                <IconPublicPostSvg className="self-center" />
                <Dot />
                <p className="font-inter text-sm">{post?.location}</p>
            </div>
        </div>
    </div>
}