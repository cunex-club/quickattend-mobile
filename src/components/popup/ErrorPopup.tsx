import { ErrorOutline } from "@mui/icons-material";
import QuickAttendButton from "../QuickAttendButton";
import PopupLayout from "@/layout/PopupLayout";
import { useTranslations } from "next-intl";

interface ErrorPopupProps {
  errorMessage: string;
  onNext: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onNextMessage?: string;
  onCancel?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onCancelMessage?: string;
}

function ErrorPopup({
  errorMessage,
  onNext,
  onNextMessage,
  onCancel,
  onCancelMessage,
}: ErrorPopupProps) {
  const tCommon = useTranslations("common");

  return (
    <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl px-4 py-6">
      <div className="w-full h-fit flex justify-center">
        <ErrorOutline
          className="text-primary mb-4"
          style={{ fontSize: "40px" }}
        />
      </div>
      <p
        className="label-large-primary mb-6 text-center"
        dangerouslySetInnerHTML={{
          __html: errorMessage,
        }}
      />
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {onCancel && (
          <QuickAttendButton
            type="text"
            variant="outline"
            onClick={e => onCancel(e)}
          >
            <p>{onCancelMessage || tCommon("cancel")}</p>
          </QuickAttendButton>
        )}
        <QuickAttendButton
          type="text"
          variant="filled"
          onClick={e => onNext(e)}
        >
          <p>{onNextMessage || tCommon("confirm")}</p>
        </QuickAttendButton>
      </div>
    </PopupLayout>
  );
}

export default ErrorPopup;
