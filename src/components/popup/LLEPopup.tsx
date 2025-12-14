import QuickAttendButton from "../QuickAttendButton";
import PopupLayout from "@/layout/PopupLayout";
import { useTranslations } from "next-intl";

interface LLEPopupProps {
  setOpenLLEPopup: (b: boolean) => void;
  tohref?: string;
  description?: string;
}

function LLEPopup({ setOpenLLEPopup, tohref, description }: LLEPopupProps) {
  const tLLE = useTranslations("lle");
  const tCommon = useTranslations("common");
  return (
    <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl px-4 py-6">
      <h3 className="headline-small-emphasized mb-4 text-center">
        {tLLE("externalServiceTitle")}
      </h3>
      <p className="label-large-primary mb-6 text-center">
        {description ? description : tLLE("externalServiceMessage")}
      </p>
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <QuickAttendButton
          type="text"
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setOpenLLEPopup(false);
          }}
        >
          <p className="translate-y-1">{tCommon("cancel")}</p>
        </QuickAttendButton>
        <QuickAttendButton
          type="text"
          variant="filled"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            if (tohref) {
              window.location.href = tohref;
            }
            setOpenLLEPopup(false);
          }}
        >
          <p className="translate-y-1">{tCommon("confirm")}</p>
        </QuickAttendButton>
      </div>
    </PopupLayout>
  );
}

export default LLEPopup;
