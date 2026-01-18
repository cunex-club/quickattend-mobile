import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { languageCode, LanguageCode, languageLabel } from "@/utils/const";

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
            key={code}
            onClick={() => changeLocale(code)}
            disabled={locale === code}
            className={`label-large-emphasized ${
              locale === code
                ? "font-semibold text-primary cursor-default"
                : "text-neutral-500 hover:text-primary cursor-pointer"
            }`}
          >
            {languageLabel[code]}
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
  return (
    <div className="w-full h-fit px-4 py-6 bg-neutral-200 flex justify-between gap-4 items-center">
      <div className="flex flex-col gap-4">
        <Image src="/cunex.svg" alt="CUNEX Logo" width={100} height={20} />
        <LanguageButtons />
      </div>

      <div>This is Right Side</div>
    </div>
  );
};

export default Footer;
