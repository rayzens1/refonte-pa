// Sélectionne toutes les sections de la page
const sections = document.querySelectorAll('.section');

// Index de la section actuellement affichée
let currentSectionIndex = 0;

// Variable pour empêcher plusieurs défilements simultanés
let isScrolling = false;

/**
 * Fonction pour défiler vers une section donnée
 * @param {number} index - L'index de la section cible
 */
function scrollToSection(index) {
    // Vérifie si l'index est dans les limites (évite de défiler hors de la page)
    if (index < 0 || index >= sections.length) return;

    // Met à jour l'index de la section courante
    currentSectionIndex = index;

    // Fait défiler jusqu'à la section cible avec une animation fluide
    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    const navbar = document.querySelector('.navbar');
    if (currentSectionIndex != 0) { // Si la page a été défilée
        navbar.classList.add('scrolled'); // Ajoute la classe 'scrolled'
        console.log("Scrolled")
    } else {
        navbar.classList.remove('scrolled'); // Retire la classe 'scrolled' quand la page est tout en haut
        console.log("reset")
    }
}

// Gestionnaire d'événement pour les clics sur la navbar
const navLinks = document.querySelectorAll('.nav-links a');

// Ajouter un événement "click" à chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Empêcher le comportement par défaut du lien (qui est de suivre l'URL)
        event.preventDefault();

        // Récupérer la valeur du data-target de l'élément cliqué
        const targetId = this.getAttribute('data-target');
        
        // Afficher l'id du target ou faire d'autres actions selon les besoins
        console.log("Clic sur le bouton avec data-target: " + targetId);
        
        // Vous pouvez également naviguer vers la section correspondante si besoin
        const targetSection = document.querySelector(`#section${targetId}`);
        if (targetSection) {
            scrollToSection(parseInt(targetId))
        }
    });
});

// Sélectionner tous les liens avec href="#top"
const topLinks = document.querySelectorAll('a[href="#top"]');

// Ajouter un gestionnaire d'événements pour chaque lien
topLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Empêcher le comportement par défaut (le défilement vers #top)
        event.preventDefault();

        scrollToSection(0)
    });
});

/**
 * Gestionnaire d'événement pour le défilement à la molette
 */
document.addEventListener('wheel', (event) => {
    // Si un défilement est déjà en cours, ignore l'événement
    if (isScrolling) return;

    // Défile vers le bas ou vers le haut selon la direction de la molette
    if (event.deltaY > 0) {
        scrollToSection(currentSectionIndex + 1);
    } else {
        scrollToSection(currentSectionIndex - 1);
    }

    // Active le verrouillage pour empêcher d'autres défilements
    isScrolling = true;

    // Désactive le verrouillage après 200ms
    setTimeout(() => {
        isScrolling = false;
    }, 200); // Ajustez ce délai pour changer la durée du verrouillage
});

/**
 * Gestionnaire d'événement pour les touches fléchées
 */
document.addEventListener('keydown', (event) => {
    // Si un défilement est déjà en cours, ignore l'événement
    if (isScrolling) return;

    // Vérifie quelle touche a été pressée
    if (event.key === 'ArrowDown') {
        scrollToSection(currentSectionIndex + 1); // Flèche bas : section suivante
    } else if (event.key === 'ArrowUp') {
        scrollToSection(currentSectionIndex - 1); // Flèche haut : section précédente
    }

    // Active le verrouillage pour empêcher d'autres défilements
    isScrolling = true;

    // Désactive le verrouillage après 200ms
    setTimeout(() => {
        isScrolling = false;
    }, 200); // Même durée que pour la molette
});
