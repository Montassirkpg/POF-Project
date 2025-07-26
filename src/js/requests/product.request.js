const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCategories(csrfToken) {
    return await fetch(`${API_URL}/api/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "csrf-token": csrfToken
        },
        credentials: "include"
    })
        .then(d => d.json())
        .catch(err => console.error(err));
}

export async function createProduct(formData, csrfToken, jwtToken) {
    return await fetch(`${API_URL}/api/product`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "csrf-token": csrfToken,
        },
        body: formData
    })
        .then(d => d)
        .catch(err => console.error(err));
}

export async function getProducts(csrfToken) {
    return await fetch(`${API_URL}/api/products`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "csrf-token": csrfToken,
        },
    })
        .then(d => d.json())
        .catch(err => console.error(err));
}

export async function getProductById(csrfToken, id) {
    return await fetch(`${API_URL}/api/product/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "csrf-token": csrfToken,
        },
    })
        .then(d => d.json())
        .catch(err => console.error(err));
}

export async function updateProduct(id, csrfToken, jwtToken, payload) {
    return await fetch(`${API_URL}/api/product/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
            "csrf-token": csrfToken,
        },
        body: JSON.stringify(payload),
    })
        .then(d => d)
        .catch(err => console.error(err));
}

export async function deleteProduct(id, csrfToken, jwtToken) {
    return await fetch(`${API_URL}/api/product/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
            "csrf-token": csrfToken,
        }
    })
        .then(d => d)
        .catch(err => console.error(err));
}

export async function getCategorieStatistics() {
    return await fetch(`${API_URL}/api/categories/statistics`)
        .then(d => d.json())
        .catch(error => console.error(error));
}

export function getImageUrl(url) {
    return `${API_URL}/uploads/${url}`;
}