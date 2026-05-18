document.addEventListener('DOMContentLoaded', () => {
    const SEASONS = ['autumn', 'spring', 'summer', 'winter'];
    const LABELS  = { autumn: 'aut', spring: 'spr', summer: 'sum', winter: 'win' };

    // ── SEASON ──────────────────────────────────────────────
    function setSeason(season) {
        document.documentElement.setAttribute('data-season', season);
        localStorage.setItem('season', season);
        document.querySelectorAll('.season-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.season === season);
        });
    }

    // ── DARK / LIGHT ─────────────────────────────────────────
    function setTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.classList.toggle('bi-sun-fill',        theme === 'dark');
            icon.classList.toggle('bi-moon-stars-fill', theme !== 'dark');
        });
    }

    // ── INIT ─────────────────────────────────────────────────
    setSeason(localStorage.getItem('season') || 'summer');
    setTheme(localStorage.getItem('theme')   || 'light');

    // ── DARK/LIGHT TOGGLE BUTTON ─────────────────────────────
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    });

    // ── INJECT SEASON PICKER INTO NAVBAR ─────────────────────
    document.querySelectorAll('.navbar-nav').forEach(nav => {
        const li = document.createElement('li');
        li.className = 'nav-item d-flex align-items-center';

        const picker = document.createElement('div');
        picker.className = 'season-picker d-flex align-items-center';

        SEASONS.forEach((s, i) => {
            if (i > 0) {
                const sep = document.createElement('span');
                sep.className = 'season-sep';
                sep.textContent = '/';
                picker.appendChild(sep);
            }
            const btn = document.createElement('button');
            btn.className = 'season-btn';
            btn.dataset.season = s;
            btn.textContent = LABELS[s];
            btn.addEventListener('click', () => setSeason(s));
            picker.appendChild(btn);
        });

        li.appendChild(picker);
        nav.insertBefore(li, nav.lastElementChild);
    });

    // Apply active class after injection
    setSeason(localStorage.getItem('season') || 'summer');

    // ── LIGHTBOX ─────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = '<img>';
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector('img');

    document.querySelectorAll('.expandable-img').forEach(img => {
        img.addEventListener('click', () => {
            overlayImg.src = img.src;
            overlay.style.display = 'flex';
        });
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        overlayImg.src = '';
    });
});
