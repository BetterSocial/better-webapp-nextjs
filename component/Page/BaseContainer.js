import 'styles/Home.module.css'

import React from "react";

/**
 * 
 * @param {BaseContainerProps} param0 
 * @returns {React.ReactNode}
 */
export function BaseContainer({ children, className = '' }) {
    return <div className={`flex flex-col content-center sm:w-full items-center justify-center h-[calc(100dvh)] ${className}`}>
        {children}
    </div>
}