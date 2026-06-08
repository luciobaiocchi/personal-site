/**
 * Cloudflare Worker — view counter (every POST increments)
 *
 * KV binding required: VIEWS_KV
 *
 * GET  /views?slug=blog/example        → { views: 42 }
 * POST /views?slug=blog/example        → { views: 43 }
 */

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default {
    async fetch(request, env) {
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: CORS_HEADERS });
        }

        const url  = new URL(request.url);
        const slug = url.searchParams.get("slug");

        if (!slug || !/^[\w/-]{1,120}$/.test(slug)) {
            return json({ error: "invalid slug" }, 400);
        }

        const countKey = `views:${slug}`;
        const current  = parseInt(await env.VIEWS_KV.get(countKey) ?? "0", 10);

        if (request.method === "GET") {
            return json({ views: current });
        }

        if (request.method === "POST") {
            const next = current + 1;
            await env.VIEWS_KV.put(countKey, String(next));
            return json({ views: next });
        }

        return json({ error: "method not allowed" }, 405);
    },
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
}
