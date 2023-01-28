import DateUtils from 'utils/date';
import Dot from 'component/Dot';
import IconPublicPostSvg from 'assets/icon/svg/IconPublicPostSvg';
import React from 'react';

export default function HeaderInfo({ post }) {
    return <div className="flex flex-col ml-2 flex-1">
        <p className="font-inter font-bold">{post?.actor?.data?.username}</p>
        <div className="flex flex-row">
            <p className="font-inter text-sm">{DateUtils.formatPostDate(post?.time)}</p>
            <Dot />
            <IconPublicPostSvg className="self-center" />
            <Dot />
            <p className="font-inter text-sm">{post?.location}</p>
        </div>
    </div>
}