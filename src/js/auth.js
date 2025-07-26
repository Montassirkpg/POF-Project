import { fetchCSRFToken, login, register } from "./requests/authentication.request";
import { getCookie } from './utils/cookie.util';

// REGISTER FORM HANDLING

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        await fetchCSRFToken();
        const csrf = getCookie("csrf_token");

        const name = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await register(name, password, csrf);
        const data = response ? await response.json() : "";

        if (!response.ok) {
            document.getElementById('register-error').textContent = 'Erreur lors de l\'inscription : ' + data.message;
            return;
        };

        alert('Inscription réussie ! ' + data.message);
        window.location.href = '/src/pages/login.html';
    });
}

// LOGIN FORM HANDLING

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        await fetchCSRFToken();
        const csrf = getCookie("csrf_token");

        const name = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await login(name, password, csrf);

        if (!response.access_token) {
            document.getElementById('login-error').textContent = response.message;
            return;
        }

        localStorage.setItem("access_token", response.access_token);
        alert('Connection réussie !');
        window.location.href = '/src/pages/dashboard.html';
    });
}