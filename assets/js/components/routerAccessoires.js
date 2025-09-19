// Fonction pour créer une carte accessoire
function createAccessoryCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}" class="img-card mb-2">
            <div class="w-100 flex flex-col align-start">
                <div class="w-100 flex justify-between">
                    <p class="">${product.name}</p>
                    <span><strong>${product.price.toFixed(2)}€</strong></span>
                </div>
                <div class="flex flex-col gap-1 w-100">
                    <button class="orange w-100" data-product-id="${product.id}">Voir le produit</button>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour charger les accessoires et les afficher
function loadAccessories(search = "") {
    fetch('../data/products.json')
        .then(res => res.json())
        .then(products => {
            let grips = products.filter(product => product.type === 'grip');
            // Filtrer les produits si une recherche est effectuée
            if (search !== "") {
                grips = grips.filter(product =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.description.toLowerCase().includes(search.toLowerCase())
                );
            }
            const container = document.querySelector('#accessories-container');
            // Afficher les produits
            if (container) {
                if (grips.length === 0 && search !== "") {
                    container.innerHTML = `
                        <div class="w-100 text-center p-4 h-s-75">
                            <p>Aucun accessoire trouvé pour "${search}"</p>
                        </div>
                    `;
                    container.style.gridTemplateColumns = "1fr";
                } else {
                    container.innerHTML = grips.map(createAccessoryCard).join('');
                    container.style.gridTemplateColumns = "";
                    const viewProductButtons = container.querySelectorAll('button.orange.w-100');
                    viewProductButtons.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const productId = btn.getAttribute('data-product-id');
                            window.location.href = `./product.html?id=${productId}`;
                        });
                    });
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des accessoires:', error);
        });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadAccessories();

    // Récupération des éléments de recherche
    const searchInput = document.querySelector('.input-search');
    const searchButton = document.querySelector('.button-search');

    // Fonction de recherche
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        loadAccessories(searchTerm);
    }

    // Événement sur le bouton de recherche
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    // Événement sur la saisie
    if (searchInput) {

        // Recherche avec la touche Entrée
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
});
