import getConfig from "next/config"

export async function getServerSideProps({ query, req }) {
    const { REDIRECT_MAIN_URL } = getConfig().serverRuntimeConfig
    const queryParamString = new URLSearchParams(query).toString()
    return {
        redirect: {
            destination: `${REDIRECT_MAIN_URL}/verification?${queryParamString}`,
            permanent: false,
        },
    }
}

export default function HumanIdRedirect() {
    return <div>Redirecting...</div>
}