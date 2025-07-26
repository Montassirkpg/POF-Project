import { getCookie } from './utils/cookie.util';
import { deleteProduct, getProductById } from './requests/product.request';

const input = document.getElementById("product-id");
const loadBtn = document.getElementById("load-product");
const deleteBtn = document.getElementById("delete-btn");
const details = document.getElementById("product-details");
const result = document.getElementById("result");

const jwtToken = localStorage.getItem("access_token");
const csrfToken = getCookie("csrf_token");


loadBtn.addEventListener("click", async () => {
  const id = input.value.trim();
  if (!id) {
    result.textContent = "Veuillez entrer un ID.";
    result.style.color = "red";
    return;
  }

  try {
    const product = await getProductById(csrfToken, id);

    if (!product) throw new Error("Produit introuvable");

    details.innerHTML = `
      <p><strong>Label :</strong> ${product.label}</p>
      <p><strong>Description :</strong> ${product.description}</p>
      <p><strong>Prix :</strong> ${product.price} €</p>
      <p><strong>Catégorie :</strong> ${product.category}</p>
    `;

    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        const image = document.createElement("img");
        image.src = img.url;
        image.alt = "Image du produit";
        image.style.maxWidth = "150px";
        image.style.margin = "5px";
        details.appendChild(image);
      });
    }

    deleteBtn.style.display = "inline-block";
    result.textContent = "";
  } catch (err) {
    details.innerHTML = "";
    deleteBtn.style.display = "none";
    result.textContent = `❌ ${err.message}`;
    result.style.color = "red";
  }
});

deleteBtn.addEventListener("click", async () => {
  const id = input.value.trim();
  if (!id) return;

  if (!jwtToken || !csrfToken) {
    result.textContent = "❌ Vous devez être connecté pour supprimer un produit.";
    result.style.color = "red";
    return;
  }

  if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

  try {
    const response = await deleteProduct(id, csrfToken, jwtToken);

    if (!response.ok) throw new Error("Erreur lors de la suppression");

    result.style.color = "green";
    result.textContent = " Produit supprimé avec succès.";
    details.innerHTML = "";
    deleteBtn.style.display = "none";
    input.value = "";
  } catch (err) {
    console.error(err);
    result.textContent = ` ${err.message}`;
    result.style.color = "red";
  }
});
