// On attend que le HTML soit chargé
document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle; // Le bouton est lui-même l'icône dans ton HTML

    // 1. Vérifier si l'utilisateur a déjà choisi un thème
    const currentTheme = localStorage.getItem('theme');

    // Si l'utilisateur avait choisi "light", on l'active tout de suite
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        icon.textContent = '🌙'; // Affiche la lune pour dire "revenir au sombre"
        themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
    }

    // 2. Gestion du clic sur le bouton
    themeToggle.addEventListener('click', () => {
        
        // On bascule la classe 'light-mode' sur le body
        body.classList.toggle('light-mode');

        // On met à jour l'icône et on sauvegarde le choix
        if (body.classList.contains('light-mode')) {
            icon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
            themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
        } else {
            icon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
            themeToggle.setAttribute('aria-label', 'Passer en mode clair');
        }
    });

    // Smooth scrolling for anchor links
    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // ========== MODALES ==========
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modals = document.querySelectorAll('.modal');

    // Ouvrir une modale
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.classList.add('show');
                button.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
                
                // Diriger le focus vers la modale
                const modalBox = modal.querySelector('.modal-box');
                if (modalBox) {
                    setTimeout(() => {
                        modalBox.focus();
                    }, 100);
                }
            }
        });
    });

    // Fermer une modale
    const closeModal = (modal, button) => {
        modal.classList.remove('show');
        if (button) {
            button.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = 'auto';
    };

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            const triggerButton = document.querySelector(`.open-modal[data-target="${modal.id}"]`);
            closeModal(modal, triggerButton);
        });
    });

    // Fermer en cliquant sur l'overlay
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            const triggerButton = document.querySelector(`.open-modal[data-target="${modal.id}"]`);
            closeModal(modal, triggerButton);
        });
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    const triggerButton = document.querySelector(`.open-modal[data-target="${modal.id}"]`);
                    closeModal(modal, triggerButton);
                }
            });
        }
    });
});