import * as React from "react"

const IconPollWinnerBadge = (props) => (
    <svg
        width={20}
        height={21}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx={10} cy={10.933} r={9} stroke="#fff" strokeWidth={2} />
        <path
            d="M7.158 10.08a.75.75 0 0 0 1.074-.327l1.29-2.82c.05-.11.216-.25.478-.25s.428.14.479.25l1.289 2.82a.75.75 0 0 0 1.074.328l1.833-1.123a.65.65 0 0 1 .647-.002l.386-.643-.386.643c.175.105.192.24.17.318l-1.25 4.375c-.032.11-.193.284-.492.284h-7.5c-.3 0-.46-.174-.491-.284l-1.25-4.375c-.023-.079-.006-.213.17-.318l-.387-.643.386.643a.65.65 0 0 1 .647.002l1.833 1.123Z"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default IconPollWinnerBadge
