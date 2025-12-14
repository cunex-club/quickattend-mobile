import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest } from "next/server";

export function i18nMiddleware(request: NextRequest) {
  const intlMiddleware = createIntlMiddleware(routing);
  return intlMiddleware(request);
}
