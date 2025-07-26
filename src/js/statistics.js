import { getCategorieStatistics } from "./requests/product.request";

const resultats = document.getElementById("resultats");

getCategorieStatistics()
    .then(stats => {
        if (!stats || !Array.isArray(stats) || stats.length === 0) {
            resultats.innerHTML = "<p>Aucune donnée disponible.</p>";
            return;
        }

        const list = document.createElement("ul");

        stats.forEach(stat => {
            const item = document.createElement("li");
            item.textContent = `${stat.categorie} : ${stat.nombre} produit(s)`;
            list.appendChild(item);
        });

        resultats.appendChild(list);
    })
    .catch(err => {
        resultats.innerHTML = `<p style="color:red;">Erreur : ${err.message}</p>`;
        console.error("Erreur statistiques :", err);
    });