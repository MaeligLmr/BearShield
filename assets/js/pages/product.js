function getProductId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'), 10);
}

function getCustomizationData() {
    const formData = new FormData(document.querySelector('#customization-form'));
    return {
        phoneModel: formData.get('phone-model'),
        color: formData.get('color')
    };
}

function showMessage(message, type = 'error') {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;

    const addToCartBtn = document.querySelector('#add-to-cart-btn');
    addToCartBtn.parentNode.insertBefore(messageDiv, addToCartBtn);
}

function addToCart(product) {
    const customization = getCustomizationData();
    // Si accessoire, ne pas vérifier le modèle de téléphone
    if (product.type !== 'grip') {
        if (!customization.phoneModel) {
            showMessage('Veuillez sélectionner un modèle de téléphone', 'error');
            return;
        }
    }
    const cartItem = window.cartManager.addProduct(product, customization);
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    console.log('Produit ajouté au panier:', cartItem);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/products.json')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === getProductId());
            if (product) {
                document.title = `${product.name} - BearShield`;
                document.querySelector('#product-image').src = product.image;
                document.querySelector('#product-image').alt = product.name;
                document.querySelector('#product-name').textContent = product.name;
                document.querySelector('#product-description').textContent = product.description;
                document.querySelector('#product-price').innerHTML = `<strong>${product.price.toFixed(2)}€</strong>`;

                // Masquer le select du modèle de téléphone si accessoire
                if (product.type === 'grip') {
                    const phoneModelBlock = document.querySelectorAll('.form-item');
                    if (phoneModelBlock) {
                        phoneModelBlock.forEach(block => block.style.display = 'none');
                    }
                }

                const addToCartBtn = document.querySelector('#add-to-cart-btn');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        addToCart(product);
                    });
                }
            } else {
                document.querySelector('main').innerHTML = '<section><h2>Produit introuvable</h2><p>Le produit demandé n\'existe pas.</p></section>';
            }
        });
});
