function createProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}" class="img-card mb-2">
            <div class="w-100 flex flex-col align-start">
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

function loadProducts() {
    fetch('../data/products.json')
        .then(res => res.json())
        .then(products => {
            const coques = products.filter(product => product.type === 'coque');
            const container = document.getElementById('products-container');
            
            if (container) {
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
        })
        .catch(error => {
            console.error('Erreur lors du chargement des produits:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadProducts);
