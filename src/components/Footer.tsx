import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { languageCode, LanguageCode, languageLabel } from "@/utils/const";
import { Instagram, PhoneOutlined } from "@mui/icons-material";
import { useState } from "react";
import LLEPopup from "./popup/LLEPopup";

const LanguageButtons = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: LanguageCode) => {
    if (nextLocale === locale) return;

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-0.5">
      {languageCode.map((code, idx) => (
        <div className="flex items-center gap-0.5" key={code}>
          <button
            onClick={() => changeLocale(code)}
            disabled={locale === code}
            className={`label-large-emphasized ${
              locale === code
                ? "font-semibold text-primary cursor-default"
                : "text-neutral-500 hover:text-primary cursor-pointer"
            }`}
          >
            <p>{languageLabel[code]}</p>
          </button>
          {idx !== languageCode.length - 1 && (
            <span className="mx-1 text-neutral-400">|</span>
          )}
        </div>
      ))}
    </div>
  );
};

const Footer = () => {
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [toHref, setToHref] = useState("");
  const [description, setDescription] = useState("");

  const locale = useLocale();

  const tFooter = useTranslations("footer");

  return (
    <>
      <div className="w-full h-fit px-4 py-6 bg-neutral-200 flex justify-between gap-4">
        {/* Left Side */}
        <div className="flex flex-col gap-4">
          <Image
            src="/lle/cunex.svg"
            alt="CUNEX Logo"
            width={100}
            height={20}
          />
          <LanguageButtons />
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end">
          {/* Icons */}
          <div className="flex gap-4 mb-3">
            <PhoneOutlined
              sx={{ width: 24, height: 24 }}
              className="text-primary cursor-pointer"
              onClick={() => {
                setToHref("tel:020086556");
                setOpenLLEPopup(true);
                setDescription("");
              }}
            />

            <Instagram
              sx={{ width: 24, height: 24 }}
              className="text-primary cursor-pointer"
              onClick={() => {
                setOpenLLEPopup(true);
                setToHref("https://www.instagram.com/cunex.review/");
                setDescription("");
              }}
            />
          </div>

          {/* Policy */}
          <p
            className="label-large-primary h-fit text-primary cursor-pointer underline mb-1 text-end"
            onClick={() => {
              setOpenLLEPopup(true);
              if (locale == languageCode[0]) {
                setToHref("https://cunex.chula.ac.th/privacy/cunex_th.html");
              } else {
                setToHref("https://cunex.chula.ac.th/privacy/cunex_en.html");
              }
              setDescription("");
            }}
          >
            {tFooter("policy")}
          </p>

          {/* Terms of Services */}
          <p
            className="label-large-primary underline cursor-pointer text-primary text-end"
            onClick={() => {
              setOpenLLEPopup(true);
              if (locale == languageCode[0]) {
                setToHref("https://cunex.chula.ac.th/privacy/cunex_th.html");
              } else {
                setToHref("https://cunex.chula.ac.th/privacy/cunex_en.html");
              }
              setDescription("");
            }}
          >
            {tFooter("termsAndConditions")}
          </p>
        </div>
      </div>

      {openLLEPopup && (
        <LLEPopup
          tohref={toHref}
          setOpenLLEPopup={setOpenLLEPopup}
          description={description}
        />
      )}
    </>
  );
};

export default Footer;
