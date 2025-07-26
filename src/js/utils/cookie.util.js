export function getCookie(name) {
    const cookies = `; ${document.cookie}`;
    const cookie_elements = cookies.split(`; ${name}=`);

    if (cookie_elements.length === 2) return cookie_elements.pop().split(';').shift();
}
