const API_BASE = "http://localhost:5000/api";
const categorySelect = document.getElementById("category-select");
const form = document.getElementById("product-form");
const result = document.getElementById("result");


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const csrfToken = getCookie("csrf_token");
const jwtToken = localStorage.getItem("access_token");

fetch(`${API_BASE}/categories`, {
  method: "GET",
  headers: {
    "csrf-token": csrfToken
  },
  credentials: "include"
})
  .then(res => {
    if (!res.ok) throw new Error("Erreur CSRF");
    return res.json();
  })
  .then(categories => {
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.label;
      option.textContent = cat.label;
      categorySelect.appendChild(option);
    });
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

  try {
    const res = await fetch(`${API_BASE}/product`, {
      method: "POST",
      headers: {
        "csrf-token": csrfToken,
        "Authorization": `Bearer ${jwtToken}`
      },
      credentials: "include",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Erreur lors de l’ajout");

    result.innerHTML = `<p>Produit ajouté avec succès !</p>`;
    form.reset();
  } catch (err) {
    console.error("Erreur ajout produit :", err);
    result.innerHTML = `<p> ${err.message}</p>`;
  }
});
