const API_BASE = "http://localhost:5000/api";
const input = document.getElementById("product-id");
const loadBtn = document.getElementById("load-product");
const deleteBtn = document.getElementById("delete-btn");
const details = document.getElementById("product-details");
const result = document.getElementById("result");

const jwtToken = localStorage.getItem("access_token");
const csrfToken = getCookie("csrf_token");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

loadBtn.addEventListener("click", async () => {
  const id = input.value.trim();
  if (!id) {
    result.textContent = "Veuillez entrer un ID.";
    result.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/product/${id}`, {
      headers: { "csrf-token": csrfToken },
      credentials: "include"
    });

    if (!res.ok) throw new Error("Produit introuvable");

    const product = await res.json();
    const p = Array.isArray(product) ? product[0] : product;

    details.innerHTML = `
      <p><strong>Label :</strong> ${p.label}</p>
      <p><strong>Description :</strong> ${p.description}</p>
      <p><strong>Prix :</strong> ${p.price} €</p>
      <p><strong>Catégorie :</strong> ${p.category}</p>
    `;

    if (p.images && p.images.length > 0) {
      p.images.forEach(img => {
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
    const res = await fetch(`${API_BASE}/product/${id}`, {
      method: "DELETE",
      headers: {
        "csrf-token": csrfToken,
        "Authorization": `Bearer ${jwtToken}`
      },
      credentials: "include"
    });

    if (!res.ok) throw new Error("Erreur lors de la suppression");

    result.style.color = "green";
    result.textContent = " Produit supprimé avec succès.";
    details.innerHTML = "";
    deleteBtn.style.display = "none";
    input.value = "";
  } catch (err) {
    result.textContent = ` ${err.message}`;
    result.style.color = "red";
  }
});
