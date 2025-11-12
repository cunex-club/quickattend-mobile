import PopupLayout from "@/layout/popup";
import {
  Business,
  CancelRounded,
  Person,
  WatchLater,
} from "@mui/icons-material";
import { useState } from "react";
import QuickAttendButton from "../QuickAttendButton";

interface FailScanPopupProps {
  handleSubmit: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function FailScanPopup({ handleSubmit }: FailScanPopupProps) {
  const [note, setNote] = useState("");

  return (
    <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl">
      {/* Header */}
      <div className="w-full h-fit p-6 bg-error rounded-t-4xl flex justify-center items-center mb-6">
        <CancelRounded className="text-white" sx={{ width: 40, height: 40 }} />
        <p className="ml-2 headline-large-emphasized text-white translate-y-1.5">
          ลงทะเบียนไม่สำเร็จ
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col px-4 pt-2 pb-6">
        {/* Information */}
        <div className="flex flex-col gap-2 mb-8">
          <p className="title-large-primary text-center">
            ไม่ได้อยู่ในรายชื่อผู้มีสิทธิ์ลงทะเบียนเข้าร่วมกิจกรรม
          </p>
        </div>

        {/* Note */}
        <form className="flex flex-col gap-2 mb-6">
          <p className="title-medium-emphasized">หมายเหตุ</p>
          <input
            className="w-full h-11 border border-neutral-400 focus:outline-none rounded-md px-3"
            value={note}
            placeholder="กรอกข้อมูลเพิ่มเติม (ถ้ามี)"
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
            <p className="translate-y-1">ตกลง</p>
          </QuickAttendButton>
        </div>
      </div>
    </PopupLayout>
  );
}

export default FailScanPopup;
