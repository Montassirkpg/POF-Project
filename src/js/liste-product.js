const API_URL = "http://localhost:5000/api/products";
const container = document.getElementById("product-list");

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    const [k, v] = c.split("=");
    if (k === name) return v;
  }
  return null;
}
await fetch("http://localhost:5000/authentication/csrf", {
  method: "POST",
  credentials: "include"
});

fetch(API_URL, {
  method: "GET",
  headers: {
    "csrf-token": getCookie("csrf_token")
  },
  credentials: "include"
})
  .then(response => response.json())
  .then(products => {
    console.log("Produits reçus :", products);

    if (!Array.isArray(products)) {
      container.innerHTML = "<p>Erreur : format inattendu</p>";
      return;
    }

    container.innerHTML = products.map(p => {
      const imgUrl = p.images?.[0]?.url;

      const imageHTML = imgUrl
        ? `<img src="http://localhost:5000/uploads/${imgUrl}" alt="${p.label}" width="150" />`
        : `<p>Aucune image</p>`;

      return `
        <div class="product-card">
          ${imageHTML}
          <h3>${p.label}</h3>
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
