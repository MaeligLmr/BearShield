class CartManager {
    constructor() {
        this.storageKey = 'bearshield_cart';
        this.cart = this.loadCart();
    }
    // Charger le panier depuis le localStorage
    loadCart() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Sauvegarder le panier dans le localStorage
    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }

    // Ajouter un produit au panier
    addProduct(product, customization = {}) {
        const cartItem = {
            id: Date.now(),
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            customization: customization,
            quantity: 1,
            type: product.type,
            addedAt: new Date().toISOString()
        };

        this.cart.push(cartItem);
        this.saveCart();
        return cartItem;
    }

    // Supprimer un produit du panier par son ID unique
    removeProduct(cartItemId) {
        this.cart = this.cart.filter(item => item.id !== cartItemId);
        this.saveCart();
    }

    // Récupérer tous les éléments du panier
    getCart() {
        return this.cart;
    }

    // Calculer le total du panier
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Vider le panier
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Obtenir le nombre total d'articles dans le panier
    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
}

window.cartManager = new CartManager();