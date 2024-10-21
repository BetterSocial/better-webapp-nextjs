import getConfig from "next/config";
import { verify } from "jsonwebtoken"

export type AuthResult = {
    user_id: string
}

const { serverRuntimeConfig } = getConfig();

const isAuthValid = (token: string): AuthResult | null => {
    try {
        const decoded = verify(token, serverRuntimeConfig.JWT_SECRET)
        console.log('decoded', decoded);
        return decoded as AuthResult
    } catch (e) {
        return null
    }
}

export default isAuthValid