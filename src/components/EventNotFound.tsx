import { useLocale, useTranslations } from "next-intl";
import QuickAttendButton from "./QuickAttendButton";
import { useRouter } from "next/navigation";

const EventNotFound = () => {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  return (
    <div className="w-full h-fit flex flex-col px-8 pt-8 pb-12 gap-4 justify-center items-center">
      {/* Title */}
      <p className="text-xl text-center headline-large-primary">
        {tCommon("eventNotFound")}
      </p>

      {/* Home Button */}
      <div>
        <QuickAttendButton
          variant="filled"
          type="text"
          onClick={() => router.replace(`/${locale}`)}
        >
          <p className="translate-y-1">{tCommon("home")}</p>
        </QuickAttendButton>
      </div>
    </div>
  );
};

export default EventNotFound;
