import { useState } from "react";
import QuickAttendIcon, {
  CalendarIcon,
  LocationIcon,
  OwnerIcon,
  ScanIcon,
  UploadIcon,
  StatisticIcon,
  TimeIcon,
} from "./QuickAttendIcon";
import QuickAttendButton from "./QuickAttendButton";
import LLEPopup from "./LLEPopup";

interface MyEventCardProps {
  id: string;
  name: string;
  date: string;
  timeRange: string;
  location: string;
  description: string;
  owner: string;
}

export default function MyEventCard({
  id,
  name,
  date,
  timeRange,
  location,
  description,
  owner,
}: MyEventCardProps) {
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [openShareDropdown, setOpenShareDropdown] = useState(false);

  return (
    <div
      key={id}
      className="w-full min-h-[412px] bg-neutral-100 rounded-4xl flex flex-col px-4 py-6 cursor-pointer"
      onClick={() => {
        alert(`Go to Event ${id}`);
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-1">
        <h2 className="title-large-emphasized text-neutral-600">{name}</h2>
        <QuickAttendIcon
          iconName="ellipsis-vertical"
          type="filled"
          size={20}
          className="-translate-y-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpenLLEPopup(true);
          }}
        />
      </div>

      {/* Information */}
      <div className="flex flex-col gap-1 mb-4">
        {/* Date */}
        <div className="flex gap-2">
          <CalendarIcon />
          <p className="body-medium-primary text-neutral-600">{date}</p>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <TimeIcon />
          <p className="body-medium-primary text-neutral-600">{timeRange}</p>
        </div>

        {/* Location */}
        <div className="flex gap-2">
          <LocationIcon />
          <p className="body-medium-primary text-neutral-600">{location}</p>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col mb-4">
        <h2 className="title-medium-emphasized text-neutral-600">
          รายละเอียดกิจกรรม
        </h2>
        <p className="body-small-primary text-neutral-600">{description}</p>
      </div>

      {/* Owner */}
      <div className="flex gap-2 mb-4">
        <OwnerIcon />
        <p className="body-small-primary text-neutral-600">{owner}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-1 flex-wrap">
        <QuickAttendButton
          variant="filled"
          width={180}
          onClick={(e) => {
            e.stopPropagation();
            alert(`Go to Scan from Card ${id}`);
          }}
        >
          <ScanIcon />
          <p className="translate-y-1">สแกนผู้เข้าร่วมกิจกรรม</p>
        </QuickAttendButton>

        <QuickAttendButton
          variant="outline"
          width={45}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <StatisticIcon type="filled" />
        </QuickAttendButton>

        <div className="relative">
          <QuickAttendButton
            variant="outline"
            width={45}
            onClick={(e) => {
              e.stopPropagation();
              setOpenShareDropdown((prev) => !prev);
            }}
          >
            <UploadIcon />
          </QuickAttendButton>

          {openShareDropdown && (
            <div className="w-40 absolute bottom-full mb-1 -translate-x-[70%] bg-neutral-white rounded-lg shadow-elevation-1 p-2 z-10">
              <button
                className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Go to Scan Page for Event ${id}`);
                  setOpenShareDropdown(false);
                }}
              >
                ตัวสแกน QR
              </button>
              <button
                className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Go to Dashboard for Event ${id}`);
                  setOpenShareDropdown(false);
                }}
              >
                แดชบอร์ด
              </button>
            </div>
          )}
        </div>

        {openLLEPopup && <LLEPopup setOpenLLEPopup={setOpenLLEPopup} />}
      </div>
    </div>
  );
}
