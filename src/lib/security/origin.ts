export function isTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  if (!origin) return true;

  try {
    const originUrl = new URL(origin);

    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

    const proto = request.headers.get("x-forwarded-proto") ?? request.url.split(":")[0];

    if (!host) return false;

    return originUrl.host === host && originUrl.protocol === `${proto}:`;
  } catch {
    return false;
  }
}

// export function isTrustedOrigin(request: Request): boolean {
//   const origin = request.headers.get("origin");

//   if (!origin) return true;

//   try {
//     const requestUrl = new URL(request.url);
//     const originUrl = new URL(origin);
//     return requestUrl.host === originUrl.host;
//   } catch {
//     return false;
//   }
// }
