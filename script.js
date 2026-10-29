document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const menuButton = document.querySelector('.menu-icon');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    function setMenuOpen(open) {
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
        mainNav.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function isMenuOpen() {
        return menuButton.getAttribute('aria-expanded') === 'true';
    }

    menuButton.addEventListener('click', function() {
        setMenuOpen(!isMenuOpen());
    });

    // Close menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setMenuOpen(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen() && !event.target.closest('.main-nav') && !event.target.closest('.menu-icon')) {
            setMenuOpen(false);
        }
    });

    // Close menu with Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen()) {
            setMenuOpen(false);
            menuButton.focus();
        }
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen()) {
            setMenuOpen(false);
        }
    });

    // Keep the copyright year current
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
