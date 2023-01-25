import IconCommentPostSvg from "assets/icon/svg/IconCommentPostSvg";
import IconSharePostSvg from "assets/icon/svg/IconSharePostSvg";

export default function Footer() {
    return (
        <div className='flex items-center  w-full h-[52px]'>
            <IconSharePostSvg className="mx-4 cursor-pointer" />
            <div className="flex flex-row items-center">
                <IconCommentPostSvg className="mx-4 mr-2" />
                <p className="text-grayIcon">20</p>
            </div>
        </div>
    )
}