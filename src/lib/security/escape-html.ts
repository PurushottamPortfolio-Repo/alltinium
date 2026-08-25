/**
 * Escape a user-supplied string before interpolating it into an HTML email
 * template. Without this, form fields (name, message, etc.) can inject
 * arbitrary markup into emails opened by staff — a phishing/spoofing vector.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
