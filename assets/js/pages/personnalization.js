document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('.img-produit');
    const base = svg.getElementById('bottom');
    const interior = svg.getElementById('interior');
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(id => svg.getElementById(id));
    const buttons = ['btn-1', 'btn-2', 'btn-3'].map(id => svg.getElementById(id));

    function updateColor(color) {
        const isGlossy = document.getElementById('finish').checked;
        let fillValue, strokeValue;
        const svg = document.querySelector('.img-produit');
        // Gestion du transparent : fond noir très léger, stroke blanc visible
        if (color === 'transparent') {
            fillValue = 'rgba(155, 155, 155, 0.1)';
            strokeValue = 'rgba(85, 85, 85, 0.4)';
        } else {
            fillValue = color;
            strokeValue = darkenColor(color, 0.2);
        }

        // Appliquer le fill et stroke (jamais de flou sur le stroke)
        base.setAttribute('fill', fillValue);
        base.setAttribute('stroke', strokeValue);
        interior.setAttribute('fill', fillValue);
        interior.setAttribute('stroke', strokeValue);
        corners.forEach(c => {
            c.setAttribute('stroke', strokeValue);
            c.setAttribute('fill', fillValue);
        });
        buttons.forEach(b => {
            b.setAttribute('stroke', strokeValue);
            b.setAttribute('fill', fillValue);
        });

        // Nettoyer les overlays/filters précédents
        let overlay = svg.querySelector('#glossy-gradient');
        let blurFilter = svg.querySelector('#matte-blur');
        if (overlay) overlay.remove();
        if (blurFilter) blurFilter.remove();

        if (isGlossy) {
            // Ajoute un gradient diagonal pour le glossy
            // Crée le gradient dans <defs> si absent
            let defs = svg.querySelector('defs');
            if (!defs) {
                defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                svg.insertBefore(defs, svg.firstChild);
            }
            let grad = defs.querySelector('#glossy-gradient-def');
            if (grad) grad.remove();
            grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            grad.setAttribute('id', 'glossy-gradient-def');
            grad.setAttribute('x1', '100%');
            grad.setAttribute('y1', '0%');
            grad.setAttribute('x2', '0%');
            grad.setAttribute('y2', '100%');
            let stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', 'white');
            stop1.setAttribute('stop-opacity', '0.32');
            let stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '60%');
            stop2.setAttribute('stop-color', 'white');
            stop2.setAttribute('stop-opacity', '0.08');
            let stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop3.setAttribute('offset', '100%');
            stop3.setAttribute('stop-color', 'white');
            stop3.setAttribute('stop-opacity', '0');
            grad.appendChild(stop1);
            grad.appendChild(stop2);
            grad.appendChild(stop3);
            defs.appendChild(grad);
            // Overlay rect avec le gradient
            const glossyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            glossyRect.setAttribute('id', 'glossy-gradient');
            glossyRect.setAttribute('x', '0');
            glossyRect.setAttribute('y', '0');
            glossyRect.setAttribute('width', '100%');
            glossyRect.setAttribute('height', '100%');
            glossyRect.setAttribute('fill', 'url(#glossy-gradient-def)');
            glossyRect.setAttribute('pointer-events', 'none');
            svg.appendChild(glossyRect);
            // Retirer tout filtre
            base.removeAttribute('filter');
            interior.removeAttribute('filter');
        } else {
            // Blur léger uniquement sur le fill (jamais sur le stroke)
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', 'matte-blur');
            const feGaussian = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            feGaussian.setAttribute('stdDeviation', '0.5');
            filter.appendChild(feGaussian);
            svg.appendChild(filter);
            base.setAttribute('filter', 'url(#matte-blur)');
            interior.setAttribute('filter', 'url(#matte-blur)');
        }
    }

    function toggleCorners(show) {
        corners.forEach(c => c.setAttribute('visibility', show ? 'visible' : 'hidden'));
    }

    function toggleButtons(show) {
        buttons.forEach(b => b.setAttribute('visibility', show ? 'visible' : 'hidden'));
    }

    function darkenColor(hex, percent) {
        // Convert hex to RGB
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        // Réduire chaque composant
        r = Math.floor(r * (1 - percent));
        g = Math.floor(g * (1 - percent));
        b = Math.floor(b * (1 - percent));

        // Retourner la nouvelle couleur hex
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    function setFinish() {
        const colorRadio = document.querySelector('input[name="color"]:checked').value;
        updateColor(colorRadio);
    }

    function getCustomizationData() {
        const form = document.querySelector('#customization-form');
        const formData = new FormData(form);
        // Associer les codes hex à leur nom
        const colorMap = {
            'transparent': 'Transparent',
            '#2b2b2b': 'Noir',
            '#ff6b35': 'Orange',
            '#924036': 'Bordeaux',
            '#205780': 'Bleu'
        };
        let colorValue = formData.get('color');
        let colorName = colorMap[colorValue] || colorValue;
        // Récupérer les noms des accessoires sélectionnés
        let accessories = formData.getAll('accessories');
        if (accessories.length) {
            accessories = accessories.map(id => {
                // Cherche l'input correspondant
                const input = document.querySelector(`input[name='accessories'][value='${id}']`);
                if (input) {
                    // Remonte jusqu'à .accessory-card puis cherche .accessory-name
                    const card = input.closest('.accessory-card');
                    if (card) {
                        const nameElem = card.querySelector('.accessory-name');
                        if (nameElem) return nameElem.textContent.trim();
                    }
                }
                return id;
            });
        }
        return {
            phoneModel: formData.get('phone-model'),
            color: colorName,
            finish: formData.get('finish') ? 'Brillant' : 'Matte',
            corners: formData.get('corner-type') ? 'Renforcés' : 'Standards',
            material: formData.get('material') ? 'Souple' : 'Rigide',
            buttons: formData.get('button-type') ? 'Renforcés' : 'Standards',
            accessories: accessories
        };
    }

    function addToCart() {
        // Récupération du SVG modifié et conversion en image base64
        const svgElement = document.querySelector('.img-produit');
        let svgData = new XMLSerializer().serializeToString(svgElement);
        let svgBase64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        // Récupération du prix total (sans le symbole €) et conversion en float
        const price = parseFloat(document.querySelector('.price-amount').textContent.replace('€', '').trim());
        // Récupération des données de personnalisation
        const customization = getCustomizationData();
        // Récupération des noms des accessoires sélectionnés

        const product = { name: 'Coque Personnalisée', price: price, image: svgBase64, type: 'case' };
        if (!customization.phoneModel) {
            showMessage('Veuillez sélectionner un modèle de téléphone', 'error');
            return;
        }
        window.cartManager.addProduct(product, customization);
        showMessage('Produit ajouté au panier !', 'success');

    };

    document.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
        e.preventDefault();
        addToCart();
    });

    function showMessage(message, type = 'error') {
        const existingMessage = document.querySelector('.form-message-fixed');
        if (existingMessage) {
            existingMessage.remove();
        }

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

        document.body.appendChild(messageDiv);

        // Auto-hide après 3s
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Connecter avec le formulaire existant
    document.querySelectorAll('input[name="color"]').forEach(input => {
        input.addEventListener('change', e => updateColor(e.target.value));
    });
    document.getElementById('corner-type').addEventListener('change', e => toggleCorners(e.target.checked));
    document.getElementById('button-type').addEventListener('change', e => toggleButtons(e.target.checked));
    document.getElementById('finish').addEventListener('change', setFinish);

    // Pré-selection par défaut
    document.querySelector('input[name="color"][value="transparent"]').checked = true;
    document.getElementById('corner-type').checked = true;
    document.getElementById('button-type').checked = true;
    document.getElementById('finish').checked = true;

    // Appliquer les valeurs par défaut
    updateColor('transparent');
    toggleCorners(true);
    toggleButtons(true);


});
