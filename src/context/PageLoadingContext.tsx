"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface PageLoadingContextType {
  showPageLoading: () => void;
  hidePageLoading: () => void;
  pageLoading: boolean;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(
  undefined
);

export const PageLoading = () => {
  const tCommon = useTranslations("common");

  return (
    <div className="absolute top-0 bg-linear-to-b from-black/40 to-transparent w-full sm:max-w-[390px] flex h-[150px] justify-center items-center">
      <div className="bg-neutral-white flex items-center gap-3 px-4 py-2 rounded-4xl">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="title-medium-primary font-bold translate-y-1">
          {tCommon("loading")}
        </p>
      </div>
    </div>
  );
};

export function PageLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageLoading, setPageLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setPageLoading(false);
  }, [pathname, searchParams]);

  const showPageLoading = () => setPageLoading(true);
  const hidePageLoading = () => setPageLoading(false);

  return (
    <PageLoadingContext.Provider
      value={{
        showPageLoading,
        hidePageLoading,
        pageLoading,
      }}
    >
      {children}
      {pageLoading && <PageLoading />}
    </PageLoadingContext.Provider>
  );
}

export function usePageLoading() {
  const context = useContext(PageLoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
