export async function getServerSideProps({ query, req }) {
    const queryParamString = new URLSearchParams(query).toString()
    return {
        redirect: {
            destination: `/verification?${queryParamString}`,
            permanent: false,
        },
    }
}

export default function HumanIdRedirect() {
    return <div>Redirecting...</div>
}