"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferred-locale");

    if (savedLocale && (savedLocale === "th" || savedLocale === "en")) {
      router.replace(`/${savedLocale}`);
      return;
    }

    const browserLanguage = navigator.language || navigator.languages?.[0];
    const locale = browserLanguage?.startsWith("th") ? "th" : "en";

    localStorage.setItem("preferred-locale", locale);

    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="w-full sm:max-w-[390px] fixed min-h-screen bg-neutral-white flex items-center justify-center z-50">
      <p className="text-xl animate-pulse headline-large-primary">Loading...</p>
    </div>
  );
}
