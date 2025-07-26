import { getProductById, updateProduct } from "./requests/product.request";
import { getCookie } from "./utils/cookie.util";

const form = document.getElementById("edit-form");
const fetchBtn = document.getElementById("fetch-btn");
const productFields = document.getElementById("product-fields");
const result = document.getElementById("result");


const jwtToken = localStorage.getItem("access_token");
const csrfToken = getCookie("csrf_token");

fetchBtn.addEventListener("click", async () => {
  const id = document.getElementById("product-id").value;
  
  if (!id) return;

  try {
    const product = await getProductById(csrfToken, id);

    if (!product) throw new Error("Produit introuvable");

    document.getElementById("label").value = product.label;
    document.getElementById("description").value = product.description || "";
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;

    productFields.style.display = "flex";
  } catch (err) {
    result.innerHTML = `<p> ${err.message}</p>`;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("product-id").value;

  const payload = {
    label: document.getElementById("label").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
  };

  try {
    const response = await updateProduct(id, csrfToken, jwtToken, payload);

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");

    result.innerHTML = `<p> Produit mis à jour avec succès !</p>`;
  } catch (err) {
    result.innerHTML = `<p>${err.message}</p>`;
  }
});
