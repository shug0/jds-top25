import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Les pages régénérées chaque jour depuis le Google Sheet (REVALIDATE dans lib/sheets.ts)
// sont stockées dans le KV NEXT_INC_CACHE_KV déclaré dans wrangler.jsonc.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: memoryQueue,
});
