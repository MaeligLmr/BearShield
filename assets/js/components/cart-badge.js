class CartBadge {
    constructor() {
        this.badgeElement = null;
        this.cartIconContainer = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.waitForComponents());
        } else {
            this.waitForComponents();
        }
    }

    waitForComponents() {
        const checkContainer = () => {
            const container = document.querySelector('.container-cart');
            if (container) {
                this.setup();
            } else {
                setTimeout(checkContainer, 100);
            }
        };
        checkContainer();
    }

    setup() {
        this.cartIconContainer = document.querySelector('.container-cart');
        if (this.cartIconContainer) {
            this.createBadge();
            this.updateDisplay();
            this.setupCartListener();
        }
    }

    createBadge() {
        if (!this.badgeElement) {
            this.badgeElement = document.createElement('span');
            this.badgeElement.className = 'cart-badge';
            this.cartIconContainer.appendChild(this.badgeElement);
        }
    }

    updateDisplay() {
        if (!this.badgeElement || !window.cartManager) return;

        const itemCount = window.cartManager.getItemCount();

        if (itemCount > 0) {
            this.badgeElement.textContent = itemCount;
            this.badgeElement.style.display = 'flex';
        } else {
            this.badgeElement.style.display = 'none';
        }
    }

    setupCartListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'bearshield_cart') {
                this.updateDisplay();
            }
        });

        const originalAddProduct = window.cartManager.addProduct.bind(window.cartManager);
        const originalRemoveProduct = window.cartManager.removeProduct.bind(window.cartManager);
        const originalClearCart = window.cartManager.clearCart.bind(window.cartManager);

        window.cartManager.addProduct = (...args) => {
            const result = originalAddProduct(...args);
            this.updateDisplay();
            return result;
        };

        window.cartManager.removeProduct = (...args) => {
            const result = originalRemoveProduct(...args);
            this.updateDisplay();
            return result;
        };

        window.cartManager.clearCart = (...args) => {
            const result = originalClearCart(...args);
            this.updateDisplay();
            return result;
        };
    }
}

window.cartBadge = new CartBadge();