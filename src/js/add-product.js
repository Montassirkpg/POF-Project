import { getCookie } from '../js/utils/cookie.util'
import { createProduct, getCategories } from './requests/product.request';
import { fetchCSRFToken } from './requests/authentication.request';

const categorySelect = document.getElementById("category-select");
const form = document.getElementById("product-form");
const result = document.getElementById("result");

await fetchCSRFToken();
const csrfToken = getCookie("csrf_token");

const jwtToken = localStorage.getItem("access_token");

getCategories(csrfToken)
  .then(categories => {
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.label;
      option.textContent = cat.label;
      categorySelect.appendChild(option);
    })
  })
  .catch(err => {
    categorySelect.innerHTML = '<option>Erreur de chargement</option>';
    console.error("Erreur chargement catégories :", err);
  });


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  
  const rawPrice = formData.get("price");
  formData.set("price", parseFloat(rawPrice));

  const response = await createProduct(formData, csrfToken, jwtToken);

  if (response.ok) result.innerHTML = `<p>Produit ajouté avec succès !</p>`;
  else result.innerHTML = `<p> ${response.json().message}</p>`;

  form.reset();
});
