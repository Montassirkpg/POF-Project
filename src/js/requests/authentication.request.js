const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchCSRFToken() {
    return await fetch(`${API_URL}/authentication/csrf`, {
        method: "POST",
        credentials: "include"
    })
        .then((d) => d)
        .catch((error) => console.error(error.message))
};


export async function login(name, password, csrf) {
    return await fetch(`${API_URL}/authentication/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ name, password }),
        headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf
        }
    })
        .then((d) => d.json())
        .catch((error) => console.error(error.message))
}

export async function register(name, password, csrf) {
    return await fetch(`${API_URL}/authentication/register`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name, password }),
        headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf
        },
    })
        .then((d) => d)
        .catch((error) => console.error(error));
}

export async function refresh(csrf) {
    return await fetch(`${API_URL}/authentication/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf,
        }
    })
        .then((d) => d.json())
        .catch((error) => console.error(error));
}

export async function logout(){
    return await fetch(`${API_URL}/authentication/logout`,{
        method:'POST',
        credentials:'include',
    })
}