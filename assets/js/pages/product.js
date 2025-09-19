// Récupérer l'ID du produit depuis l'URL
function getProductId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'), 10);
}

// Récupérer les données de personnalisation du formulaire
function getCustomizationData() {
    const formData = new FormData(document.querySelector('#customization-form'));
    return {
        phoneModel: formData.get('phone-model'),
        color: formData.get('color')
    };
}

// Afficher un message temporaire
function showMessage(message, type = 'error') {
    // Supprimer le message existant s'il y en a un
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Créer et insérer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type} form-message-fixed`;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '4rem';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.padding = '1em 2em';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.background = type === 'error' ? '#ffdddd' : '#ddffdd';
    messageDiv.style.color = '#222';
    const addToCartBtn = document.querySelector('#add-to-cart-btn');
    addToCartBtn.parentNode.insertBefore(messageDiv, addToCartBtn);

    // Supprimer le message après 3 secondes
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
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
    //ajouter le produit au panier
    window.cartManager.addProduct(product, customization);
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    // Afficher un message de succès
    showMessage('Produit ajouté au panier !', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
    // Par défaut, sélectionner la couleur transparente
    const transparentColorOption = document.querySelector('input[name="color"][value="transparent"]');
    if (transparentColorOption) {
        transparentColorOption.checked = true;
    }

    // Charger les données du produit
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
