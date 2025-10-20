import QuickAttendButton from "./QuickAttendButton";

interface LLEPopupProps {
  setOpenLLEPopup: (b: boolean) => void;
}

export default function LLEPopup({ setOpenLLEPopup }: LLEPopupProps) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-black/70"
      onClick={(e) => {
        e.stopPropagation();
        setOpenLLEPopup(false);
      }}
    >
      <div
        className="relative bg-neutral-white w-[349px] rounded-4xl px-4 py-6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3 className="headline-small-emphasized mb-4 text-center">
          แจ้งเตือน
        </h3>
        <p className="label-large-primary mb-6 text-center">
          บริการที่เลือกจะนำท่านไปสู่เว็บไซต์ของผู้ให้บริการที่อยู่ภาย
          นอกแอปพลิเคชัน ท่านยืนยันจะใช้บริการต่อหรือไม่
        </p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <QuickAttendButton
            type="text"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setOpenLLEPopup(false);
            }}
          >
            <p className="translate-y-1">ยกเลิก</p>
          </QuickAttendButton>
          <QuickAttendButton
            type="text"
            variant="filled"
            onClick={(e) => {
              e.stopPropagation();
              alert("Go to LLE!");
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
