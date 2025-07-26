import { getImageUrl, getProductById } from "./requests/product.request";
import { fetchCSRFToken } from './requests/authentication.request';
import { getCookie } from './utils/cookie.util';

const input = document.getElementById("product-id");
const button = document.getElementById("fetch-product-btn");
const container = document.getElementById("product-card");

await fetchCSRFToken();
const csrf = getCookie('csrf_token');

async function fetchProductById(productId) {
  try {
    const product = await getProductById(csrf, productId);

    if (!product) throw new Error('Produit invalide !');

    console.log("Réponse produit :", product);

    const images = product.images.map(i => `<img src="${getImageUrl(i.url)}" alt="${product.label}" width="200" />`);

    container.innerHTML = `
    <div class="product-card">
      <h3>${product.label}</h3>
      ${images.length > 0 ? images : '<p>Aucune image</p>'}
      <p>Description : ${product.description}</p>
      <p>Prix : ${product.price} €</p>
      <p>Catégorie : ${product.category}</p>
    </div>
    `;

  } catch (error) {
    container.innerHTML = `<p>Erreur : ${error.message}</p>`;
  }
}

button.addEventListener("click", async () => {
  const productId = input.value.trim();

  if (!productId || isNaN(productId)) {
    container.innerHTML = "<p>Veuillez entrer un ID numérique valide.</p>";
    return;
  }

  await fetchProductById(productId);
});
