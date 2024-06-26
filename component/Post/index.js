import Content from "component/Post/Content";
import Footer from "component/Post/Footer";
import PostBrandOverlay from "component/Brand/PostBrandOverlay";
import Underline from "component/Underline";
import { Header } from "component/Post/Header";

/**
 * @param {PostComponentProps} props
 * @returns {React.ReactNode}
 */
export default function PostComponent(props) {
    const { post } = props;
    return <div className='flex flex-col items-center h-dvh bg-white sm:w-screen md:w-1/2 lg:w-1/3 xl:1/4 overflow-hidden'>
        <Header post={post} />
        <Underline />
        <Content post={post} />
        <Underline />
        <Footer post={post} />
        <PostBrandOverlay />
    </div>
}