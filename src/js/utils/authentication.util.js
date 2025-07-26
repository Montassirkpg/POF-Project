import { verifyJWT } from "./jwt.util";
import { fetchCSRFToken, refresh } from '../requests/authentication.request';
import { getCookie } from "./cookie.util";

export async function isAuthenticated() {
    await fetchCSRFToken();
    const csrf = getCookie('csrf_token');
    
    const local_token = localStorage.getItem('access_token');
    const is_token_valid = verifyJWT(local_token);

    if (!is_token_valid) {
        const token = await refresh(csrf);
        localStorage.setItem('access_token', token);

        return verifyJWT(token);
    }
    
    return is_token_valid;
}