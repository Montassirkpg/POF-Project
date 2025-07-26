let csrfToken = null;
const getCSRFToken = async () => {
    try {
        console.log('🔄 Récupération du token CSRF...');
        const response = await fetch('http://localhost:5000/authentication/csrf', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            csrfToken = await response.text();
            console.log('Token CSRF reçu:', csrfToken);
        } else {
            console.log(' Erreur récupération CSRF:', response.status);
        }
    } catch (error) {
        console.error(' Erreur CSRF:', error);
    }
};

getCSRFToken();
const registerUser = async () => {

    if (!csrfToken) await getCSRFToken();
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:5000/authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inscription réussie ! ' + data.message);
            window.location.href = '/src/pages/login.html';
        } else {
            document.getElementById('register-error').textContent = 'Erreur lors de l\'inscription : ' + data.message;
        }

    } catch (error) {
        document.getElementById('register-error').textContent = 'Erreur de connexion';
    }
};
const loginUser = async () => {
    console.log('🔄 Début loginUser');
    if (!csrfToken) {
        console.log('⚠️ Pas de token CSRF, récupération...');
        await getCSRFToken();
    }
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:5000/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access_token", data.access_token);
            alert('Connection réussie !');
            window.location.href = '/src/pages/dashboard.html';
        } else {
            console.log(' Erreur login:', data);
            document.getElementById('login-error').textContent = data.message;
        }

    } catch (error) {
        console.log(' Erreur :', error);
        document.getElementById('login-error').textContent = 'Erreur de connexion';
    }
};

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerUser();
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginUser();
    });
}