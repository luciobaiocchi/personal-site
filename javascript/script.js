document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');

    // Imposta il tema iniziale
    function setTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcon(theme);
    }

    // Aggiorna l'icona in base al tema attuale
    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
        }
    }

    // Verifica il tema salvato o imposta quello di default
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Cambia tema al click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
});


document.addEventListener('DOMContentLoaded', function () {
    // Crea l'overlay una volta sola
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = '<img>';
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector('img');

    // Al click sull'immagine
    document.querySelectorAll('.expandable-img').forEach(img => {
        img.addEventListener('click', () => {
            overlayImg.src = img.src;
            overlay.style.display = 'flex';
        });
    });

    // Chiudi al click sull'overlay
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        overlayImg.src = '';
    });
});
