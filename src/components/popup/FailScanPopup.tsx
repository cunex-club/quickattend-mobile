import PopupLayout from "@/layout/PopupLayout";
import { CancelRounded } from "@mui/icons-material";
import QuickAttendButton from "../QuickAttendButton";
import { useTranslations } from "next-intl";

interface FailScanPopupProps {
  note: string;
  setNote: (s: string) => void;
  handleSubmit: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function FailScanPopup({ note, setNote, handleSubmit }: FailScanPopupProps) {
  const tCommon = useTranslations("common");
  const tScan = useTranslations("scan");
  return (
    <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl">
      {/* Header */}
      <div className="w-full h-fit p-6 bg-error rounded-t-4xl flex justify-center items-center mb-6">
        <CancelRounded className="text-white" sx={{ width: 40, height: 40 }} />
        <p className="ml-2 headline-large-emphasized text-white translate-y-1.5">
          {tScan("failTitle")}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col px-4 pt-2 pb-6">
        {/* Information */}
        <div className="flex flex-col gap-2 mb-8">
          <p className="title-large-primary text-center">
            {tScan("notEligible")}
          </p>
        </div>

        {/* Note */}
        <form className="flex flex-col gap-2 mb-6">
          <p className="title-medium-emphasized">{tScan("note")}</p>
          <input
            className="w-full h-11 border border-neutral-400 focus:outline-none rounded-md px-3"
            value={note}
            placeholder={tScan("notePlaceholder")}
            onChange={e => setNote(e.target.value)}
          />
        </form>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <QuickAttendButton
            type="text"
            variant="filled"
            onClick={e => {
              handleSubmit(e);
            }}
          >
            <p>{tCommon("confirm")}</p>
          </QuickAttendButton>
        </div>
      </div>
    </PopupLayout>
  );
}

export default FailScanPopup;
