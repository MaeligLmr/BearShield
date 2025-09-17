function getProductId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'), 10);
}

function getCustomizationData() {
    const formData = new FormData(document.getElementById('customization-form'));
    return {
        phoneModel: formData.get('phone-model'),
        color: formData.get('color')
    };
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/products.json')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === getProductId());
            if (product) {
                document.title = `${product.name} - BearShield`;
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-image').alt = product.name;
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-price').innerHTML = `<strong>${product.price.toFixed(2)}€</strong>`;
            } else {
                document.querySelector('main').innerHTML = '<section><h2>Produit introuvable</h2><p>Le produit demandé n\'existe pas.</p></section>';
            }
        });
});
