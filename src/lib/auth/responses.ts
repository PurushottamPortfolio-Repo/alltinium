import { NextResponse } from "next/server";

export function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  response.headers.set("Pragma", "no-cache");

  response.headers.set("Expires", "0");

  return response;
}
