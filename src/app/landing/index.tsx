import { useTranslations } from "next-intl";

const Landing = () => {
  const tCommon = useTranslations("common");
  return (
    <div className="w-full sm:max-w-[390px] fixed min-h-screen bg-neutral-white flex items-center justify-center z-50">
      <p className="text-xl animate-pulse headline-large-primary">
        {tCommon("loading")}
      </p>
    </div>
  );
};

export default Landing;
