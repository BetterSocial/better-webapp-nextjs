import IconPollWinnerBadge from 'assets/icon/svg/IconPollWinnerBadgeSvg'
import React from 'react'
import useToastHook from 'hooks/toast/useToastHook'

/**
 * 
 * @param {PollOptionComponentProps} props 
 */
export default function BasePollOption({ pollOption, isPollClosed = false, totalVote = 0, isMaxVote = false, isMultipleChoice = false }) {
    const { betterFullFunctionalityToast } = useToastHook()
    
    const percentage = totalVote <= 0 ? 0 : (pollOption?.vote / totalVote) * 100

    return <div className='w-full h-12 flex flex-row bg-gray-100 justify-start items-center my-1 rounded-md relative cursor-pointer' onClick={betterFullFunctionalityToast}>
        {isPollClosed && <div className={`absolute w-[${percentage}%] h-full bg-primaryBlue rounded-md`} />}
        <div className='relative py-2 px-4 flex flex-row justify-center items-center'>
            {isPollClosed && isMaxVote && <IconPollWinnerBadge className="mr-2" />}
            {!isPollClosed && <div className={`w-3 h-3 border border-black mr-2 flex justify-center items-center ${isMultipleChoice ? 'rounded-sm' : 'rounded-full'}`} />}
            <p>{pollOption?.option}</p>
        </div>
    </div>
}