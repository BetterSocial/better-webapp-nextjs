import AndroidBannerImage from "component/Brand/AndroidBannerImage";
import IOSBannerImage from "component/Brand/IOSBannerImage";

export default function PostBrandOverlay() {
    return <div className="flex flex-col items-center p-4 bg-primaryBlue w-full justify-center h-32 sticky bottom-0 ">
        <div className="flex flex-col items-center">
            <p className="font-inter text-white font-semibold">Download Better Social Now</p>
            <div className="flex flex-row items-center">
                <AndroidBannerImage />
                <IOSBannerImage />
            </div>
        </div>
    </div>
}