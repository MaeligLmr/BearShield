function createProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}" class="img-card mb-2">
            <div class="w-100 flex flex-col align-end">
                <div class="w-100 flex justify-between">
                    <p class="">${product.name}</p>
                    <span><strong>${product.price.toFixed(2)}€</strong></span>
                </div>
                <div class="flex flex-col gap-1 w-100">
                    <button class="lined w-100" data-product-id="${product.id}">Voir le produit</button>
                    <button class="orange w-100">Ajouter au panier</button>
                </div>
            </div>
        </div>
    `;
}

function loadProducts(search="") {
    fetch('../data/products.json')
        .then(res => res.json())
        .then(products => {
            let coques = products.filter(product => product.type === 'coque');
             if (search !== "") {
                coques = coques.filter(product => 
                    product.name.toLowerCase().includes(search.toLowerCase()) || 
                    product.description.toLowerCase().includes(search.toLowerCase())
                );
            }
            const container = document.getElementById('products-container');
           
            if (container) {
                if (coques.length === 0 && search !== "") {
                    container.parentElement.innerHTML = `
                        <div class="w-100 text-center p-4 h-s-75">
                            <p>Aucune coque trouvée pour "${search}"</p>
                        </div>
                    `;
                } else {
                container.innerHTML = coques.map(createProductCard).join('');
                
                const viewProductButtons = container.querySelectorAll('button.lined.w-100');
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
            console.error('Erreur lors du chargement des produits:', error);
        });
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Récupération des éléments de recherche
    const searchInput = document.querySelector('.input-search');
    const searchButton = document.querySelector('.button-search');
    
    // Fonction de recherche
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        loadProducts(searchTerm);
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