// Générer le HTML pour un élément du panier
function createCartItemHTML(cartItem) {
    // Afficher les options de personnalisation si elles existent
    const customizationText = cartItem.customization ? cartItem.productId === undefined ?
        `<div><p class="customization-info"><strong>Téléphone</strong>: ${cartItem.customization.phoneModel || 'Non spécifié'}</p>
        <p class="customization-info"><strong>Couleur</strong>: ${cartItem.customization.color || 'Non spécifiée'}</p>
        
        <p class="customization-info"><strong>Finition</strong>: ${cartItem.customization.finish || 'Non spécifiée'}</p>
        <p class="customization-info"><strong>Coins</strong>: ${cartItem.customization.corners || 'Non spécifiés'}</p>
        <p class="customization-info"><strong>Matériau</strong>: ${cartItem.customization.material || 'Non spécifié'}</p>
        <p class="customization-info"><strong>Boutons</strong>: ${cartItem.customization.buttons || 'Non spécifiés'}</p>
        <p class="customization-info"><strong>Accessoires</strong>: ${cartItem.customization.accessories && cartItem.customization.accessories.length > 0 ? cartItem.customization.accessories.join(', ') : 'Aucun'}</p>

        </div>` :  // Si c'est une coque
        cartItem.type === 'coque' ? `<div><p class="customization-info"><strong>Téléphone</strong>: ${cartItem.customization.phoneModel || 'Non spécifié'}</p>
        <p class="customization-info"><strong>Couleur</strong>: ${cartItem.customization.color || 'Non spécifiée'}</p>
        </div>` :
            // Si c'est un accessoire
            '' :
        '';

    // Retourner le HTML complet de l'élément du panier
    return `
        <div class="panier-item" data-cart-id="${cartItem.id}">
            <div class="flex w-100 justify-left info-produit">
                <img src="${cartItem.image}" alt="${cartItem.name}" class="panier-item-img">
                <div class="panier-item-details">
                    <div class="flex flex-col align-start">
                        <h2>${cartItem.name}</h2>
                        ${customizationText}
                    </div>
                    <p class="price">${cartItem.price.toFixed(2)}€</p>
                </div>
            </div>
            <button class="remove-item" data-cart-id="${cartItem.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
}

// Générer le HTML pour une ligne du résumé de commande
function createSummaryLineHTML(cartItem) {
    return `
        <div class="line">
            <p>${cartItem.name}</p>
            <p class="price">${cartItem.price.toFixed(2)}€</p>
        </div>
    `;
}

// Mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cart = window.cartManager.getCart();
    const cartItemsContainer = document.querySelector('.panier-items');
    const summaryContainer = document.querySelector('.panier-summary');

    if (!cartItemsContainer || !summaryContainer) return;

    // Si le panier est vide
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        summaryContainer.innerHTML = `
            <h2>Résumé de la commande</h2>
            <p>Aucun produit dans le panier</p>
        `;
        return;
    }

    // Afficher les éléments du panier et le résumé
    cartItemsContainer.innerHTML = cart.map(createCartItemHTML).join('');

    const summaryLines = cart.map(createSummaryLineHTML).join('');
    const total = window.cartManager.getTotal();

    summaryContainer.innerHTML = `
        <h2>Résumé de la commande</h2>
        ${summaryLines}
        <div class="total">
            <h3>Total</h3>
            <h3 class="price">${total.toFixed(2)}€</h3>
        </div>
        <button class="orange w-100">Valider la commande</button>
    `;

    // Ajouter les gestionnaires d'événements pour les boutons de suppression
    const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartId = parseInt(btn.getAttribute('data-cart-id'));
            window.cartManager.removeProduct(cartId);
            updateCartDisplay();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});