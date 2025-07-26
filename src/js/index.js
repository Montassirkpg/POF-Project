import { isAuthenticated } from "./utils/authentication.util";
import { logout } from "./requests/authentication.request";

const container = document.getElementById("menu");

isAuthenticated().then(authenticated => {
    if (authenticated) {
        container.innerHTML = `
          <button onclick="location.href='/src/pages/add-product.html'">Ajouter produit</button>
          <button onclick="location.href='/src/pages/edit-product.html'">Modifier produit</button>
          <button onclick="location.href='/src/pages/delete-product.html'">Supprimer produit</button>
          <button onclick="logout()">Se déconnecter</button>
        `;
    } else {
        container.innerHTML = `
          <button onclick="location.href='/src/pages/liste-products.html'">Voir produits</button>
          <button onclick="location.href='/src/pages/product.html'">Chercher par ID</button>
          <button onclick="location.href='/src/pages/login.html'">Connexion</button>
          <button onclick="location.href='/src/pages/register.html'">Inscription</button>
           <button onclick="location.href='/src/pages/statistics.html'">Afficher statistiques</button>
           <button onclick="location.href='/src/pages/csp-errors.html'">Csp errors</button>
        `;
    }
});

// ✅ Fonction globale de déconnexion
window.logout = function () {
    localStorage.removeItem("access_token");
    logout().finally(() => {
        location.href = "index.html";
    });
};