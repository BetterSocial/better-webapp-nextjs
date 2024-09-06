import Link from "next/link";

const LinkableText = ({text}: {text: string}) => {
    const sanitizeNewLine = text?.split('\n')
    const regexUrl = /(https?\:\/\/)?([^\.\s]+)?[^\.\s]+\.[^\s]+/gi

    const textComponent = sanitizeNewLine?.map((textline, index) => {
        const textLineSplit = textline?.split(' ')
        return <p className="font-normal text-sm text-white" key={textline}>
            {textLineSplit?.map((word, wordIndex) => {
                if(wordIndex < textLineSplit?.length - 1) word += ' '
                const hrefUrl = (word?.includes('http') || word?.includes('https')) ? word : `https://${word}`
                if(regexUrl?.test(word)) return <Link className="underline text-signedPrimary" href={hrefUrl}>{word}</Link>
                return word
            })}
        </p>
        
    })

    return <>
        {textComponent}
    </>
}

export default LinkableText;