import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const messages = await getMessages();

  return (
    <html className="h-full">
      <body
        className={`${chulaRegularFont.variable} ${chulaBoldFont.variable} antialiased 
          flex items-center justify-center h-full`}
        style={{
          backgroundColor: "var(--neutral-600)",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            <div className="w-full sm:max-w-[390px] min-h-screen bg-neutral-white relative">
              {children}
            </div>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
