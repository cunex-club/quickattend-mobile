import { NextRequest, NextResponse } from "next/server";
import { i18nMiddleware } from "./middleware/i18n";

const PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

function redirectTo(path: string, request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = path;

  if (PUBLIC_APP_URL) {
    const publicOrigin = new URL(PUBLIC_APP_URL);
    url.protocol = publicOrigin.protocol;
    url.hostname = publicOrigin.hostname;
    url.port = publicOrigin.port;
  }

  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    return redirectTo("/landing", request);
  }

  if (
    pathname.startsWith("/landing") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  //  i18n middleware
  const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) return i18nResponse;

  // other middleware

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
