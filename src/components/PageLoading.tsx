"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PageLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const tCommon = useTranslations("common");

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && !link.target) {
        if (e.defaultPrevented) {
          return;
        }

        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);

        if (
          url.origin === currentUrl.origin &&
          url.pathname !== currentUrl.pathname
        ) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return loading ? (
    <div className="w-full sm:max-w-[390px] fixed min-h-screen bg-neutral-white flex items-center justify-center z-50">
      <p className="text-xl animate-pulse headline-large-primary">
        {tCommon("loading")}
      </p>
    </div>
  ) : null;
}
