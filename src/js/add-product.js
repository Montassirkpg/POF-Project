const API_BASE = "http://localhost:5000/api";
const categorySelect = document.getElementById("category-select");
const form = document.getElementById("product-form");
const result = document.getElementById("result");

fetch(`${API_BASE}/categories`)
  .then(res => res.json())
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

  try {
    const res = await fetch(`${API_BASE}/product`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Erreur lors de l’ajout");

    result.innerHTML = `<p>✅ Produit ajouté avec succès !</p>`;
    form.reset();
  } catch (err) {
    result.innerHTML = `<p>❌ ${err.message}</p>`;
  }
});
