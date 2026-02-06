import { NextRequest, NextResponse } from "next/server";
import { i18nMiddleware } from "./middleware/i18n";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/landing", request.url));
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
