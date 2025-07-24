
// Inscription utilisateur
const registerUser = async () => {

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inscription réussie ! ' + data.message);
            window.location.href = '/src/pages/login.html';
        } else {
            document.getElementById('register-error').textContent = 'Erreur lors de l\'inscription : ';
        }

    } catch (error) {
        document.getElementById('register-error').textContent = 'Erreur de connexion';
    }
};

const registerForm = document.getElementById('register-form');
if (registerForm) {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            registerUser();
        });
    });
}


//-----------------------------------------------------------------

// Connexion utilisateur
const loginUser = async () => {

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Données de connexion:', { name, password });

    try {
        const response = await fetch('http://localhost:5000/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Connection réussie ! ' + data.message);
            window.location.href = '/src/pages/dashboard.html';
        } else {
            console.log('Erreur de login:', data);
            document.getElementById('login-error').textContent = data.message;
        }

    } catch (error) {
        document.getElementById('login-error').textContent = 'Erreur de connexion';
    }
};

const loginForm = document.getElementById('login-form');
if (loginForm) {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            loginUser();
        });
    });
}




