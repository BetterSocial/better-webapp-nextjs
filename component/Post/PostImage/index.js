import Image from 'next/image'
import React from 'react'

/**
 * 
 * @param {PostComponentProps} param0 
 */
export default function PostImage({ post }) {
    let { images_url } = post
    if (!Array.isArray(images_url)) return <></>

return <div className="grid col-start-auto row-auto grid-flow-dense gap-2 grid-cols-2 grid-rows-none">
        {images_url?.map((item, index) => {
            return <Image key={index} src={item} className="h-60 w-60 object-cover rounded-sm" width={240} height={240} />
        })}
    </div>

}