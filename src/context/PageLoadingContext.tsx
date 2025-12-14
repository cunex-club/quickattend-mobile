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

export function PageLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageLoading, setPageLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tCommon = useTranslations("common");

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
      {pageLoading && (
        <div className="w-full sm:max-w-[390px] fixed min-h-screen bg-neutral-white flex items-center justify-center z-50">
          <p className="text-xl animate-pulse headline-large-primary">
            {tCommon("loading")}
          </p>
        </div>
      )}
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
