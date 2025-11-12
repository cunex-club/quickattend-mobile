import PopupLayout from "@/layout/popup";
import {
  Business,
  Person,
  ReplayCircleFilled,
  WatchLater,
} from "@mui/icons-material";
import QuickAttendButton from "../QuickAttendButton";

interface RegisteredScanPopupProps {
  studentId: string;
  studentName: string;
  studentFaculty: string;
  timeStamp: string;
  note: string;
  setNote: (s: string) => void;
  handleSubmit: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function RegisteredScanPopup({
  studentId,
  studentName,
  studentFaculty,
  timeStamp,
  note,
  setNote,
  handleSubmit,
}: RegisteredScanPopupProps) {
  return (
    <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl">
      {/* Header */}
      <div className="w-full h-fit p-6 bg-warning rounded-t-4xl flex justify-center items-center mb-6">
        <ReplayCircleFilled
          className="text-white"
          sx={{ width: 40, height: 40 }}
        />
        <p className="ml-2 headline-large-emphasized text-white translate-y-1.5">
          ลงทะเบียนแล้ว
        </p>
      </div>

      {/* Image */}
      <img
        src="/mock/scan_placeholder.png"
        alt="Scan Placeholder"
        className="mx-auto mb-4"
      />

      {/* Content */}
      <div className="flex flex-col px-4 py-6">
        {/* Information */}
        <div className="flex flex-col gap-2 mb-8">
          <p className="title-medium-emphasized">
            รายละเอียดผู้ลงทะเบียนเข้างาน
          </p>

          {/* Name */}
          <div className="flex gap-2">
            <Person className="text-primary" sx={{ width: 16, height: 16 }} />
            <div className="flex flex-col -translate-y-1">
              <p className="body-medium-primary">{studentName}</p>
              <p className="body-medium-primary">รหัสประจำตัว {studentId}</p>
            </div>
          </div>

          {/* Faculty */}
          <div className="flex gap-2">
            <Business className="text-primary" sx={{ width: 16, height: 16 }} />
            <p className="body-medium-primary -translate-y-1">
              {studentFaculty}
            </p>
          </div>

          {/* Time */}
          <div className="flex gap-2">
            <WatchLater
              className="text-primary"
              sx={{ width: 16, height: 16 }}
            />
            <p className="body-medium-primary -translate-y-1">
              ลงทะเบียนสำเร็จ: {timeStamp} น.
            </p>
          </div>
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
            onClick={e => handleSubmit(e)}
          >
            <p className="translate-y-1">ตกลง</p>
          </QuickAttendButton>
        </div>
      </div>
    </PopupLayout>
  );
}

export default RegisteredScanPopup;
