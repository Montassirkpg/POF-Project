const API_BASE = "http://localhost:5000/api";

const input = document.getElementById("product-id");
const button = document.getElementById("fetch-product-btn");
const container = document.getElementById("product-detail");

button.addEventListener("click", () => {
  const productId = input.value.trim();

  if (!productId || isNaN(productId)) {
    container.innerHTML = "<p>Veuillez entrer un ID numérique valide.</p>";
    return;
  }

  fetch(`${API_BASE}/product/${productId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Produit non trouvé");
      }
      return response.json();
    })
    .then(product => {
      console.log("Réponse produit :", product);
      const p = product[0];
      const images = product.images;
      const imageList = images && images.length
        ? images.map(img => `
       <img src="http://localhost:5000/uploads/${img.url}" alt="${p.label}" width="200" />
       `).join('')
        : `<p>Aucune image</p>`;
      container.innerHTML = `
    <h2>${p.label}</h2>
    ${imageList}
    <p>Description : ${p.description}</p>
    <p>Prix : ${p.price} €</p>
    <p>Catégorie : ${p.category}</p>
  `;
    })
    .catch(error => {
      container.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
});
