const API_BASE = "http://localhost:5000/api";

const input = document.getElementById("product-id");
const button = document.getElementById("fetch-product-btn");
const container = document.getElementById("product-detail");

let csrfToken = null;


async function getCSRFToken() {
  const response = await fetch("http://localhost:5000/authentication/csrf", {
    method: "POST",
    credentials: "include"
  });
  csrfToken = await response.text();
}

async function fetchProductById(productId) {
  try {
    if (!csrfToken) await getCSRFToken();

    const response = await fetch(`${API_BASE}/product/${productId}`, {
      method: "GET",
      headers: {
        "csrf-token": csrfToken
      },
      credentials: "include"
    });

    if (!response.ok) throw new Error("Produit non trouvé");

    const product = await response.json();
    console.log("Réponse produit :", product);

    const images = product.images;
    const imageList = images && images.length
      ? images.map(img => `
          <img src="http://localhost:5000/uploads/${img.url}" alt="${product.label}" width="200" />
        `).join('')
      : `<p>Aucune image</p>`;

    container.innerHTML = `
      <h2>${product.label}</h2>
      ${imageList}
      <p>Description : ${product.description}</p>
      <p>Prix : ${product.price} €</p>
      <p>Catégorie : ${product.category}</p>
    `;

  } catch (error) {
    container.innerHTML = `<p>Erreur : ${error.message}</p>`;
  }
}

button.addEventListener("click", () => {
  const productId = input.value.trim();

  if (!productId || isNaN(productId)) {
    container.innerHTML = "<p>Veuillez entrer un ID numérique valide.</p>";
    return;
  }

  fetchProductById(productId);
});
