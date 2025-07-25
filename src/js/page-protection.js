document.addEventListener('DOMContentLoaded', async () => {
    console.log('Vérification de l\'authentification...');
    try {
        const response = await fetch('http://localhost:5000/authentication/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            console.log('Non authentifié, redirection vers index');
            window.location.href = '/index.html';
            return;
        }
        
        console.log('Utilisateur authentifié ✅');

    } catch (error) {
        console.error('Erreur lors de la vérification:', error);
        window.location.href = '/index.html';
    }
});