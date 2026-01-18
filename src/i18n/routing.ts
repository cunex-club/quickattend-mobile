import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { languageCode } from "@/utils/const";

export const routing = defineRouting({
  locales: languageCode,
  defaultLocale: languageCode[0],
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
