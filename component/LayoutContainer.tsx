import React, { ReactNode } from 'react'

type LayoutContainerProps = {
  children: ReactNode
}
const LayoutContainer = ({children, ...props}: LayoutContainerProps) => {
  return (
    <div className='flex flex-col items-center h-screen w-full bg-white md:w-1/2 lg:w-1/3 xl:1/4 overflow-hidden p-4'>
      {children}
    </div>
  )
}

export default LayoutContainer