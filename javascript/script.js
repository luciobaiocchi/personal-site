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

    // ── NAVBAR PROMPT ────────────────────────────────────────
    function buildPromptHTML() {
        const parts = window.location.pathname
            .replace(/^\//, '').replace(/\.html$/, '')
            .split('/').filter(p => p && p !== 'index');

        if (parts.length === 0) {
            return '<span style="opacity:.75">~/lucio</span>';
        }
        const base = '<span style="opacity:.3">~/lucio</span>';
        const dirs = parts.slice(0, -1).map(p => `<span style="opacity:.25">/${p}</span>`).join('');
        const leaf = `<span style="opacity:.75">/${parts[parts.length - 1]}</span>`;
        return base + dirs + leaf;
    }

    document.querySelectorAll('.navbar .container').forEach(container => {
        const prompt = document.createElement('span');
        prompt.className = 'navbar-prompt';
        prompt.innerHTML = buildPromptHTML();
        container.insertBefore(prompt, container.firstChild);
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

    // ── STATUSLINE FOOTER ────────────────────────────────────
    const footer = document.querySelector('body > footer');
    if (footer) {
        footer.innerHTML = `
            <span class="sl-left">© 2026 Lucio Baiocchi</span>
            <span class="sl-right">
                <a href="mailto:luciobaiocchi1@gmail.com">luciobaiocchi1@gmail.com</a>
                <span class="sl-sep">|</span>
                <a href="https://github.com/luciobaiocchi" target="_blank">github</a>
                <span class="sl-sep">|</span>
                <a href="https://www.linkedin.com/in/lucio-baiocchi-39b420243/" target="_blank">linkedin</a>
                <span class="sl-sep">|</span>
                <a href="https://www.youtube.com/@luciobaiocchi" target="_blank">youtube</a>
            </span>
        `;
    }

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
