// import IconCredderRatingGraySvg from 'assets/icon/svg/IconCredderRatingGraySvg'
// import IconCredderRatingGreenSvg from 'assets/icon/svg/IconCredderRatingGreenSvg'
// import IconCredderRatingRedSvg from 'assets/icon/svg/IconCredderRatingRedSvg'
// import IconCredderRatingYellowSvg from 'assets/icon/svg/IconCredderRatingYellowSvg'
import React from 'react'

/**
 * 
 * @param {CredderProps} param0 
 * @returns {React.ReactNode}
 */
export default function CredderRatingNewsLinkHeader({ rating }) {
    // const __renderCredderRatingIcon = () => {
    //     if (!rating || rating < 0) return <IconCredderRatingGraySvg style={styles.credderIcon} height={iconSize} width={iconSize} viewBox={viewBox} />
    //     if (rating <= 35) return <IconCredderRatingRedSvg style={styles.credderIcon} height={iconSize} width={iconSize} viewBox={viewBox} />
    //     if (rating > 35 && rating <= 65) return <IconCredderRatingYellowSvg style={styles.credderIcon} height={iconSize} width={iconSize} viewBox={viewBox} />

    //     return <IconCredderRatingGreenSvg style={styles.credderIcon} height={iconSize} width={iconSize} viewBox={viewBox} />
    // }

    const __renderCredderRating = () => {
        if (!rating || rating < 0) return 'n/a'
        // return ${rating}${<Text>{`%`}</Text>}
        // return <Text>{`${rating}`}<Text style={{ fontSize: scoreSize - 3 }}>%</Text></Text>
        return rating
    }

    return <div className='flex flex-col'>
        {/* {__renderCredderRatingIcon()} */}
        <p className='font-light'>{__renderCredderRating()}</p>
    </div>
}