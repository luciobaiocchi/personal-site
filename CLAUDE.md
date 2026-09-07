# Working on this site

This is Lucio Baiocchi's personal website, served as static files from Cloudflare Pages at luciobaiocchi.com.

Use plain HTML and `css/style.css` for the personal pages. There is no build system. Keep the narrow reading layout, system serif font, underlined links, and simple text navigation. Use native HTML for galleries, tables, and links to full-size images. HEARD is an exception: preserve its original landing-page design, using `css/heard.css`, `css/themes.css`, and `javascript/heard.js`.

Run `python3 -m http.server 8000 --bind 127.0.0.1` for a local preview. Check desktop and narrow phone widths, keyboard navigation, and local links after changing the layout.

Project descriptions should use specific, straightforward language about the work. Preserve technical details and distinguish prototypes from finished features. Do not edit blog article content unless the user explicitly asks.

The page map and editing workflow are in `README.md`. The personal pages have navigation and footers written directly in HTML; HEARD retains its original scripts. Use relative paths for internal links and local assets so the pages also work when opened from disk. Existing JSON-LD metadata can remain in the document head.

Keep review work local. Do not deploy or push unless the user asks.
