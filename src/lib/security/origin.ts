/**
 * Defense-in-depth same-origin check for state-changing POST routes.
 * `SameSite=Lax` on the session cookie already blocks cross-site POSTs from
 * carrying the cookie in modern browsers, but this adds an explicit check
 * per CLAUDE.md's "origin validation where appropriate" requirement.
 */
export function isTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  // Same-origin requests from browsers for state-changing methods normally
  // carry an Origin header. Missing Origin (e.g. some non-browser clients,
  // or older browsers on same-site navigations) is allowed through here —
  // this check exists to reject requests that explicitly claim a foreign
  // origin, not to require the header's presence.
  if (!origin) return true;

  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return requestUrl.host === originUrl.host;
  } catch {
    return false;
  }
}
