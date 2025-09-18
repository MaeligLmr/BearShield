document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('.img-produit');
    console.log(svg);
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
    let r = parseInt(hex.slice(1,3), 16);
    let g = parseInt(hex.slice(3,5), 16);
    let b = parseInt(hex.slice(5,7), 16);

    // Réduire chaque composant
    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));

    // Retourner la nouvelle couleur hex
    return "#" + [r,g,b].map(x => x.toString(16).padStart(2, '0')).join('');
}

    function setFinish() {
        const colorRadio = document.querySelector('input[name="color"]:checked').value;
        updateColor(colorRadio);
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
