function createCartItemHTML(cartItem) {
    const customizationText = cartItem.customization ? cartItem.productId === undefined ?
        `<div><p class="customization-info"><strong>Téléphone</strong>: ${cartItem.customization.phoneModel || 'Non spécifié'}</p>
        <p class="customization-info"><strong>Couleur</strong>: ${cartItem.customization.color || 'Non spécifiée'}</p>
        
        <p class="customization-info"><strong>Finition</strong>: ${cartItem.customization.finish || 'Non spécifiée'}</p>
        <p class="customization-info"><strong>Coins</strong>: ${cartItem.customization.corners || 'Non spécifiés'}</p>
        <p class="customization-info"><strong>Matériau</strong>: ${cartItem.customization.material || 'Non spécifié'}</p>
        <p class="customization-info"><strong>Boutons</strong>: ${cartItem.customization.buttons || 'Non spécifiés'}</p>
        <p class="customization-info"><strong>Accessoires</strong>: ${cartItem.customization.accessories && cartItem.customization.accessories.length > 0 ? cartItem.customization.accessories.join(', ') : 'Aucun'}</p>

        </div>` :  cartItem.type === 'case' ? `<div><p class="customization-info"><strong>Téléphone</strong>: ${cartItem.customization.phoneModel || 'Non spécifié'}</p>
        <p class="customization-info"><strong>Couleur</strong>: ${cartItem.customization.color || 'Non spécifiée'}</p>
        </div>` : '' : '';
    
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

function createSummaryLineHTML(cartItem) {
    return `
        <div class="line">
            <p>${cartItem.name}</p>
            <p class="price">${cartItem.price.toFixed(2)}€</p>
        </div>
    `;
}

function updateCartDisplay() {
    const cart = window.cartManager.getCart();
    const cartItemsContainer = document.querySelector('.panier-items');
    const summaryContainer = document.querySelector('.panier-summary');
    
    if (!cartItemsContainer || !summaryContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        summaryContainer.innerHTML = `
            <h2>Résumé de la commande</h2>
            <p>Aucun produit dans le panier</p>
        `;
        return;
    }

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