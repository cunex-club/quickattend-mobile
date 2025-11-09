import { defaultLLEPopupDescription } from "@/utils/const";
import QuickAttendButton from "../QuickAttendButton";

interface LLEPopupProps {
  setOpenLLEPopup: (b: boolean) => void;
  tohref?: string;
  description?: string;
}

export default function LLEPopup({
  setOpenLLEPopup,
  tohref,
  description = defaultLLEPopupDescription,
}: LLEPopupProps) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-black/70"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        setOpenLLEPopup(false);
      }}
    >
      <div
        className="relative bg-neutral-white w-[349px] rounded-4xl px-4 py-6"
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <h3 className="headline-small-emphasized mb-4 text-center">
          แจ้งเตือน
        </h3>
        <p className="label-large-primary mb-6 text-center">{description}</p>
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
            <p className="translate-y-1">ยกเลิก</p>
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
            <p className="translate-y-1">ตกลง</p>
          </QuickAttendButton>
        </div>
      </div>
    </div>
  );
}
