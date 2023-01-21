import React from "react";
import styles from 'styles/Home.module.css'

/**
 * 
 * @param {BaseContainerProps} param0 
 * @returns {React.ReactNode}
 */
export function BaseContainer({ children, className = '' }) {
    return <div className={`flex flex-col content-center sm:w-full items-center justify-center h-screen ${className}`}>
        {children}
    </div>
}