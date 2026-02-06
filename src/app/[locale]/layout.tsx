import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageLoadingProvider } from "@/context/PageLoadingContext";
import { getHealth } from "@/service/health";
import { APP_ENV } from "@/utils/env";
import { UserProvider } from "@/providers/UserProvider";

const chulaBoldFont = localFont({
  src: "../../../public/font/CHULALONGKORNBold.otf",
  variable: "--font-chula-bold",
  weight: "700",
});
const chulaRegularFont = localFont({
  src: "../../../public/font/CHULALONGKORNReg.otf",
  variable: "--font-chula-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "QuickAttend",
  description: "",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  if (APP_ENV === "development") {
    const health = await getHealth();
    console.log("Health check:", health);
  }

  return (
    <html lang={locale} className="h-full">
      <body
        className={`${chulaRegularFont.variable} ${chulaBoldFont.variable} antialiased 
          flex items-center justify-center h-full`}
        style={{
          backgroundColor: "var(--neutral-600)",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <PageLoadingProvider>
            <UserProvider>
              <div className="w-full sm:max-w-[390px] min-h-screen bg-neutral-white relative">
                {children}
              </div>
            </UserProvider>
          </PageLoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
