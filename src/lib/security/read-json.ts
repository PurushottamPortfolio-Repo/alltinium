export class PayloadTooLargeError extends Error {
  constructor() {
    super("Request payload too large");
    this.name = "PayloadTooLargeError";
  }
}

/**
 * Read and parse a JSON request body while enforcing a byte-size ceiling,
 * so a request handler never buffers an unbounded payload into memory.
 * Trusts `Content-Length` as an early rejection when present, but still
 * enforces the cap while streaming in case that header is absent or lies.
 */
export async function readJsonWithLimit<T = unknown>(
  request: Request,
  maxBytes: number,
): Promise<T> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBytes) {
    throw new PayloadTooLargeError();
  }

  if (!request.body) {
    return JSON.parse(await request.text()) as T;
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }

    chunks.push(value);
  }

  const body = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf-8");
  return JSON.parse(body) as T;
}
