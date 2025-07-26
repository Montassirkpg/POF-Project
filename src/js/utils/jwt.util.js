import { jwtDecode } from "jwt-decode";

export function verifyJWT(token) {
    try {
        const payload = jwtDecode(token);
        console.log(payload.iat - Date.now())
        return payload.iat - Date.now() > 0;
    } catch (error) {
        return false;
    }
}