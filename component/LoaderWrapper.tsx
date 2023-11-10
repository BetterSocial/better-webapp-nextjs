import React, { ReactNode } from 'react'
import { RotatingTriangles } from 'react-loader-spinner';

type Props = {
    isLoading: boolean;
    children: ReactNode;
}

export const LoaderWrapper = ({ children, ...props }: Props) => {
    return (
        props.isLoading ? <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{}}
            wrapperClass="rotating-triangels-wrapper"
        /> : (children)
    )
}
