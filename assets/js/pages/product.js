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
            } else {
                document.querySelector('main').innerHTML = '<section><h2>Produit introuvable</h2><p>Le produit demandé n\'existe pas.</p></section>';
            }
        });
});
