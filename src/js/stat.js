// Récupération et affichage des statistiques
document.addEventListener('DOMContentLoaded', async () => {
    await loadStatistics();
});

async function loadStatistics() {
    try {
        console.log('🔄 Récupération des statistiques...');
        
        const response = await fetch('http://localhost:5000/api/categories/statistics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const statistics = await response.json();
        
        //Affichage des statisques
        displayStatistics(statistics);
        
    } catch (error) {
        console.error(' Erreur lors du chargement des statistiques:', error);
    }
}


  //Affichage des statisques
function displayStatistics(statistics) {
    const statsContainer = document.getElementById('stats');
 
    let html = '<h2>Statistiques des produits par catégorie</h2>';
    
    statistics.forEach(stat => {
        html += `<p>${stat.categorie}: ${stat.nombre} produits</p>`;
    });
    
    statsContainer.innerHTML = html;
}