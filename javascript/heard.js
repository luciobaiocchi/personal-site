document.addEventListener("DOMContentLoaded", () => {
  const SEASONS = ["autumn", "spring", "summer", "winter"];
  const LABELS = { autumn: "aut", spring: "spr", summer: "sum", winter: "win" };

  // ── SEASON ──────────────────────────────────────────────
  function setSeason(season) {
    document.documentElement.setAttribute("data-season", season);
    localStorage.setItem("season", season);
    document.querySelectorAll(".season-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.season === season);
    });
  }

  // ── DARK / LIGHT ─────────────────────────────────────────
  function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    document.querySelectorAll(".theme-icon").forEach((icon) => {
      icon.classList.toggle("bi-sun-fill", theme === "dark");
      icon.classList.toggle("bi-moon-stars-fill", theme !== "dark");
    });
  }

  // ── INIT ─────────────────────────────────────────────────
  setSeason(localStorage.getItem("season") || "summer");
  setTheme(localStorage.getItem("theme") || "light");

  // ── DARK/LIGHT TOGGLE BUTTON ─────────────────────────────
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-bs-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  });

  // ── NAVBAR PROMPT ────────────────────────────────────────
  function buildPromptHTML() {
    const parts = window.location.pathname
      .replace(/^\//, "")
      .replace(/\.html$/, "")
      .split("/")
      .filter((p) => p && p !== "index");

    const cursor = '<span class="nb-cursor">▋</span>';
    if (parts.length === 0) {
      return '<span style="opacity:.75">~/lucio</span>' + cursor;
    }
    const base = '<span style="opacity:.3">~/lucio</span>';
    const dirs = parts
      .slice(0, -1)
      .map((p) => `<span style="opacity:.25">/${p}</span>`)
      .join("");
    const leaf = `<span style="opacity:.75">/${parts[parts.length - 1]}</span>`;
    return base + dirs + leaf + cursor;
  }

  document.querySelectorAll(".navbar .container").forEach((container) => {
    const prompt = document.createElement("span");
    prompt.className = "navbar-prompt";
    prompt.innerHTML = buildPromptHTML();
    container.insertBefore(prompt, container.firstChild);
  });

  // ── INJECT NAV LINKS ─────────────────────────────────────
  const _parts = window.location.pathname.split("/");
  const _parent = _parts[_parts.length - 2] || "";
  const _sub = _parent === "projects" || _parent === "blog";
  const _base = _sub ? "../" : "./";
  const _path = window.location.pathname;

  function _isActive(id) {
    if (id === "contacts") return false;
    if (id === "index") return /\/(index\.html)?$/.test(_path);
    return _path.includes("/" + id);
  }

  const NAV_LINKS = [
    { id: "index", href: _base + "index.html", label: "Home" },
    { id: "projects", href: _base + "projects.html", label: "Projects" },
    { id: "blog", href: _base + "blog.html", label: "Blog" },
    { id: "contacts", href: _base + "index.html#contacts", label: "Contacts" },
  ];

  document.querySelectorAll(".navbar-nav").forEach((nav) => {
    const anchor = nav.lastElementChild; // theme-toggle <li>
    NAV_LINKS.forEach((l) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      const a = document.createElement("a");
      a.className = "nav-link" + (_isActive(l.id) ? " active" : "");
      a.href = l.href;
      a.textContent = l.label;
      li.appendChild(a);
      nav.insertBefore(li, anchor);
    });
  });

  // ── INJECT SEASON PICKER INTO NAVBAR ─────────────────────
  document.querySelectorAll(".navbar-nav").forEach((nav) => {
    const li = document.createElement("li");
    li.className = "nav-item d-flex align-items-center";

    const picker = document.createElement("div");
    picker.className = "season-picker d-flex align-items-center";

    SEASONS.forEach((s, i) => {
      if (i > 0) {
        const sep = document.createElement("span");
        sep.className = "season-sep";
        sep.textContent = "/";
        picker.appendChild(sep);
      }
      const btn = document.createElement("button");
      btn.className = "season-btn";
      btn.dataset.season = s;
      btn.textContent = LABELS[s];
      btn.addEventListener("click", () => setSeason(s));
      picker.appendChild(btn);
    });

    li.appendChild(picker);
    nav.insertBefore(li, nav.lastElementChild);
  });

  // Apply active class after injection
  setSeason(localStorage.getItem("season") || "summer");

  // ── STATUSLINE FOOTER ────────────────────────────────────
  const footer = document.querySelector("body > footer");
  if (footer) {
    const today = new Date().toISOString().split("T")[0];
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
                <span class="sl-sep">|</span>
                <span style="opacity:.45">[${today}]</span>
            </span>
        `;
  }

  // ── VIM NAVIGATION ───────────────────────────────────────
  let gPressed = false,
    gTimer = null;
  document.addEventListener("keydown", (e) => {
    if (
      ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
    )
      return;
    if (e.key === "g" && !gPressed) {
      gPressed = true;
      clearTimeout(gTimer);
      gTimer = setTimeout(() => {
        gPressed = false;
      }, 800);
      return;
    }
    if (gPressed) {
      gPressed = false;
      clearTimeout(gTimer);
      if (e.key === "h") window.location.href = _base + "index.html";
      if (e.key === "p") window.location.href = _base + "projects.html";
    }
  });

  // ── LIGHTBOX ─────────────────────────────────────────────
  const overlay = document.createElement("div");
  overlay.id = "lightbox-overlay";
  overlay.innerHTML = "<img>";
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");

  document.querySelectorAll(".expandable-img").forEach((img) => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    overlayImg.src = "";
  });
});
