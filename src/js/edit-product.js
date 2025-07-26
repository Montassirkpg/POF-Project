const API_BASE = "http://localhost:5000/api";
const csrfToken = getCookie("csrf_token");
const jwtToken = localStorage.getItem("access_token");

const form = document.getElementById("edit-form");
const fetchBtn = document.getElementById("fetch-btn");
const productFields = document.getElementById("product-fields");
const result = document.getElementById("result");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

fetchBtn.addEventListener("click", async () => {
  const id = document.getElementById("product-id").value;
  if (!id) return;

  try {
    const res = await fetch(`${API_BASE}/product/${id}`, {
      headers: {
        "csrf-token": csrfToken
      },
      credentials: "include"
    });

    if (!res.ok) throw new Error("Produit introuvable");

    const product = await res.json();

    document.getElementById("label").value = product.label;
    document.getElementById("description").value = product.description || "";
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;

    productFields.style.display = "block";
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
    price: Number(document.getElementById("price").value),
    category: document.getElementById("category").value,
  };

  try {
    const res = await fetch(`${API_BASE}/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "csrf-token": csrfToken,
        "Authorization": `Bearer ${jwtToken}`
      },
      credentials: "include",
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Erreur lors de la mise à jour");

    result.innerHTML = `<p> Produit mis à jour avec succès !</p>`;
  } catch (err) {
    result.innerHTML = `<p>${err.message}</p>`;
  }
});
