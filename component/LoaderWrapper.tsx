import React, { ReactNode } from 'react'
import { RotatingTriangles } from 'react-loader-spinner';

type Props = {
    isLoading: boolean;
    children: ReactNode;
}

export const LoaderWrapper = ({ children, ...props }: Props) => {
    return (
        props.isLoading ? <div className='flex flex-1-0-0 w-full justify-center items-center z-50'>
            <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
            />
        </div> : (children)
    )
}
