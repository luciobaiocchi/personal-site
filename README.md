# Lucio's personal site

The personal pages use plain HTML and one shared stylesheet, with no build step or browser JavaScript. HEARD keeps its original landing-page design and dependencies.

Run a local preview from this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000>.

- `index.html` contains the introduction, selected projects, and latest writing.
- `projects.html` lists the projects; `projects/` contains their notes.
- `heard.html` has the original HEARD landing page and build notes, using `css/heard.css`, `css/themes.css`, and `javascript/heard.js`.
- `blog.html` lists the posts; `blog/` contains the articles and drafts.
- `css/style.css` controls the appearance of the personal pages.
- `template.html` is a starting point for a new project page.

Edit content directly in the HTML. When adding a project or post, add its link to the appropriate index and update `sitemap.xml`. Use relative paths for internal links and local assets so the pages also work when opened directly from disk. The personal pages have ordinary HTML navigation and footers, linked screenshots, and native `<details>` galleries. Video demos are links to YouTube. HEARD retains its original lightbox and live repository counts.

The `application/ld+json` blocks are search metadata, not executable scripts.
