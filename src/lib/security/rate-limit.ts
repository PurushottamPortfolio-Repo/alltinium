import { NextResponse } from "next/server";

/**
 * In-memory fixed-window rate limiter, keyed by an arbitrary string (e.g. `ip:route`).
 *
 * This only protects a single Node process — on a multi-instance serverless
 * deployment each instance has its own counters, so it's a best-effort layer,
 * not a hard guarantee. It still meaningfully raises the bar for the common
 * single-instance / long-running-server deployment this app is built for.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

// Periodically drop stale buckets so this map doesn't grow unbounded.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Best-effort client IP extraction. Headers are attacker-controllable unless
 * a trusted reverse proxy strips/overwrites them, so this is defense-in-depth
 * rather than a strong identity signal.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

export function rateLimitResponse(retryAfterSeconds: number, message: string) {
  return NextResponse.json(
    { success: false, error: message, message, retryAfter: retryAfterSeconds },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}
