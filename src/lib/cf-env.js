// ---------------------------------------------------------------------------
// LEMOSINE — Cloudflare bindings access
// On Cloudflare Workers (via @opennextjs/cloudflare) this exposes the KV and
// R2 bindings. Anywhere else (local `next dev`, other hosts) it returns null
// and the app falls back to the JSON-file store in /data.
// ---------------------------------------------------------------------------
let envPromise = null;

export async function getCfEnv() {
  try {
    if (!envPromise) {
      envPromise = import('@opennextjs/cloudflare')
        .then((m) => m.getCloudflareContext({ async: true }))
        .then((ctx) => ctx?.env || null)
        .catch(() => null);
    }
    return await envPromise;
  } catch {
    return null;
  }
}
