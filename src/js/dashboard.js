import { isAuthenticated } from "./utils/authentication.util";

const menu = document.getElementById("menu");
const message = document.getElementById("message");

isAuthenticated().then(auth => {
    console.log(auth)
    if (!auth) {
        alert("Vous devez être connecté.");
        window.location.href = "/index.html";
    } else {
        menu.innerHTML = `
          <button onclick="location.href='/src/pages/add-product.html'">Ajouter produit</button>
          <button onclick="location.href='/src/pages/edit-product.html'">Modifier produit</button>
          <button onclick="location.href='/src/pages/delete-product.html'">Supprimer produit</button>
          <button onclick="logout()">Se déconnecter</button>
        `;
        message.innerHTML = "<p>Bienvenue sur votre tableau de bord.</p>";
    }
});


window.logout = async function () {
    localStorage.removeItem("access_token");
    try {
        await fetch("http://localhost:5000/authentication/logout", {
            method: "POST",
            credentials: "include"
        });
    } catch (err) {
        console.warn("Erreur de déconnexion :", err);
    }
    location.href = "/index.html";
};