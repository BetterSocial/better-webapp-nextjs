import React from 'react'

/**
 * 
 * @param {PollOptionComponentProps} props 
 */
export default function PollOption({ pollOption }) {
    return <div className='w-full h-12 flex flex-row bg-gray-100 justify-start items-center py-2 px-4 my-1 rounded-md'>
        <div className='w-3 h-3 border border-black mr-2 rounded-full flex justify-center items-center' />
        <p>{pollOption?.option}</p>
    </div>
}