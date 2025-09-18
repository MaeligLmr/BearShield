class CartManager {
    constructor() {
        this.storageKey = 'bearshield_cart';
        this.cart = this.loadCart();
    }

    loadCart() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }

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

    removeProduct(cartItemId) {
        this.cart = this.cart.filter(item => item.id !== cartItemId);
        this.saveCart();
    }

    getCart() {
        return this.cart;
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
}

window.cartManager = new CartManager();