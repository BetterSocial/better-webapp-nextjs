import React, { ReactNode } from 'react'

type LayoutContainerProps = {
  children: ReactNode
}
const LayoutContainer = ({children, ...props}: LayoutContainerProps) => {
  return (
    <div className='flex flex-col items-center h-screen w-full bg-white md:max-w-M lg:max-w-M xl:max-w-M overflow-hidden p-4'>
      {children}
    </div>
  )
}

export default LayoutContainer