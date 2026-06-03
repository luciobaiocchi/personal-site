/**
 * Cloudflare Worker — view counter with IP-based daily deduplication
 *
 * KV binding required: VIEWS_KV
 *
 * GET  /views?slug=blog/example        → { views: 42 }
 * POST /views?slug=blog/example        → { views: 43 }  (increments if not seen today)
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
            const ip      = request.headers.get("CF-Connecting-IP") ?? "unknown";
            const day     = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
            const dedupKey = `seen:${slug}:${day}:${await hashIp(ip)}`;

            const alreadySeen = await env.VIEWS_KV.get(dedupKey);
            if (alreadySeen) {
                return json({ views: current });
            }

            const next = current + 1;
            // Store view count indefinitely; dedup key expires at midnight + buffer
            const secondsUntilExpiry = secondsUntilEndOfDay() + 3600;
            await Promise.all([
                env.VIEWS_KV.put(countKey, String(next)),
                env.VIEWS_KV.put(dedupKey, "1", { expirationTtl: secondsUntilExpiry }),
            ]);

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

// SHA-256 of the IP — no PII stored in KV
async function hashIp(ip) {
    const buf    = new TextEncoder().encode(ip);
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

function secondsUntilEndOfDay() {
    const now = new Date();
    const end = new Date(now);
    end.setUTCHours(23, 59, 59, 999);
    return Math.ceil((end - now) / 1000);
}
