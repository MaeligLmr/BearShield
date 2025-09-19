/**
 * Component Loader - BearShield
 * Charge automatiquement les composants header et footer
 */

document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
});

async function loadComponents() {
    try {
        // Charger le header
        await loadComponent('header');

        // Charger le footer
        await loadComponent('footer');

    } catch (error) {
        console.error('Erreur lors du chargement des composants:', error);
    }
}

async function loadComponent(componentName) {
    try {
        // Chercher l'élément placeholder
        const placeholder = document.querySelector(`[data-component="${componentName}"]`);

        if (!placeholder) {
            console.warn(`Placeholder pour ${componentName} non trouvé`);
            return;
        }

        // Déterminer le chemin relatif basé sur la structure des dossiers
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const componentPath = isInPagesFolder
            ? `../components/${componentName}.html`
            : `./components/${componentName}.html`;

        // Charger le composant
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const html = await response.text();
        placeholder.innerHTML = html;

        // Ajuster les liens relatifs si nécessaire
        if (isInPagesFolder) {
            adjustRelativeLinks(placeholder);
        }

    } catch (error) {
        console.error(`Erreur lors du chargement de ${componentName}:`, error);
    }
}

function adjustRelativeLinks(element) {
    // Ajuster les liens href qui commencent par "./"
    const links = element.querySelectorAll('a[href^="./"]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Si on est dans le dossier pages, les liens doivent rester tels quels
        // car ils pointent vers les autres pages du même dossier
    });

    // Ajuster les sources d'images
    const images = element.querySelectorAll('img[src^="../"]');
    images.forEach(img => {
        // Les images sont déjà correctement référencées avec "../assets/"
        // depuis le dossier pages
    });
}