import IconCommentPostSvg from "assets/icon/svg/IconCommentPostSvg";
import IconSharePostSvg from "assets/icon/svg/IconSharePostSvg";
import useToastHook from "hooks/toast/useToastHook";

/**
 * 
 * @param {ContentProps} param0 
 * @returns 
 */
export default function Footer({ post }) {
    const { betterFullFunctionalityToast } = useToastHook()

    return (
        <div className='flex items-center w-full py-4'>
            <IconSharePostSvg className="mx-4 cursor-pointer" />
            <div className="flex flex-row items-center cursor-pointer" onClick={betterFullFunctionalityToast}>
                <IconCommentPostSvg className="mx-4 mr-2" />
                <p className="text-grayIcon">20</p>
            </div>
        </div>
    )
}