import DateUtils from "utils/date";
import Dot from "component/Dot";
import IconPublicPostSvg from "assets/icon/svg/IconPublicPostSvg";
import Image from "next/image";
import { HeaderAnonymous } from "component/Post/Header/HeaderAnonymous";
import { HeaderDefault } from "component/Post/Header/HeaderDefault";

/**
 * 
 * @param {PostComponentProps} props 
 * @returns 
 */
export function Header(props) {
    const { post } = props;
    return post?.anonimity ? <HeaderAnonymous post={post} /> : <HeaderDefault post={post} />
}