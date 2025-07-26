import { fetchCSRFToken } from "./requests/authentication.request";
import { getImageUrl, getProducts } from "./requests/product.request";
import { getCookie } from '../js/utils/cookie.util';

const container = document.getElementById("product-list");

await fetchCSRFToken();
const csrf = getCookie('csrf_token');

getProducts(csrf).then(products => {
  console.log("Produits reçus :", products);

  if (!Array.isArray(products)) {
    container.innerHTML = "<p>Erreur : format inattendu</p>";
    return;
  }

  container.innerHTML = products.map(p => {
    const imgHtml = p.images.map(i =>
      i.url ?
        `<img src="${getImageUrl(i.url)}" alt="${p.label}" width="150" />`
        :
        `<p>Aucune image</p>`
    );
    return `
        <div class="product-card">
        <h3>${p.label}</h3>
          ${imgHtml}
          <p>${p.description || "Pas de description"}</p>
          <p>Prix : ${p.price} €</p>
          <p>Catégorie : ${p.category}</p>
        </div>
      `;
  }).join('');
})
  .catch(error => {
    console.error("Erreur lors du chargement :", error);
    container.innerHTML = `<p>Erreur : ${error.message}</p>`;
  });
