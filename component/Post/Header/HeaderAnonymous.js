import Constant from "utils/constant";
import DateUtils from "utils/date";
import Dot from "component/Dot";
import HeaderInfo from "component/Post/Header/HeaderInfo";
import IconAnonymousSvg from "assets/icon/svg/IconAnonymousSvg";
import IconPublicPostSvg from "assets/icon/svg/IconPublicPostSvg";
import Image from "next/image";
import useToastHook from "hooks/toast/useToastHook";

/**
 * 
 * @param {PostComponentProps} props 
 * @returns 
 */
export function HeaderAnonymous(props) {
    const { post } = props;

    const { betterFullFunctionalityToast } = useToastHook()

    return <div className="flex flex-row w-full p-4 cursor-pointer" onClick={betterFullFunctionalityToast}>
        <IconAnonymousSvg className="self-center ml-2" />
        <HeaderInfo post={post} />
    </div>
}