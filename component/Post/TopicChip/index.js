import React from 'react'

export default function TopicChip({ topic }) {
    return <div className="flex items-center 
        justify-center
        px-4
        py-1
        text-primaryBlue 
        bg-gray-100
        rounded-full text-xs 
        font-medium">
        #{topic}
    </div>
}