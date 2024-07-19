import React, { ReactNode } from 'react'

type LayoutContainerProps = {
  children: ReactNode;
  backgroundImage?: string;
}
const LayoutContainer = ({ children, ...props }: LayoutContainerProps) => {
  return (
    <div className='flex flex-col items-center h-dvh w-full bg-white md:max-w-M lg:max-w-M xl:max-w-M overflow-hidden pl-4 pr-4' style={props.backgroundImage && {
      backgroundImage: `url('${props.backgroundImage}')`,
      backgroundSize: 'cover',
      width: '100%',
      zIndex: 0
    }}>
      {children}
    </div>
  )
}

export default LayoutContainer