import { useState } from "react";
import QuickAttendIcon, {
  CalendarIcon,
  DocumentIcon,
  DownloadIcon,
  LocationIcon,
  OwnerIcon,
  StatisticIcon,
  TimeIcon,
  DuplicateIcon,
} from "./QuickAttendIcon";
import QuickAttendButton from "./QuickAttendButton";
import LLEPopup from "./LLEPopup";

interface PastEventCardProps {
  id: string;
  name: string;
  date: string;
  timeRange: string;
  location: string;
  description: string;
  owner: string;
  displayFirstRow: boolean;
}

export default function PastEventCard({
  id,
  name,
  date,
  timeRange,
  location,
  description,
  owner,
  displayFirstRow,
}: PastEventCardProps) {
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div
      key={id}
      className={`w-full bg-neutral-100 rounded-4xl flex flex-col px-4 py-6 cursor-pointer transition-shadow`}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center gap-4 mb-1"
        onClick={(e) => {
          e.stopPropagation();
          setOpenDetail((prev) => !prev);
        }}
      >
        <h2 className="title-large-emphasized text-neutral-600">{name}</h2>
        <QuickAttendIcon
          iconName="chevron-up"
          type="outline"
          size={20}
          className={`-translate-y-1 cursor-pointer transition-transform duration-300 ${
            openDetail ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>

      {/* Expandable Section */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          openDetail
            ? "min-h-[300px] opacity-100 mt-2"
            : "max-h-0 opacity-0 mt-0"
        }`}
        onClick={() => {
          alert(`Go to Event ${id}`);
        }}
      >
        {/* Information */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex gap-2">
            <CalendarIcon />
            <p className="body-medium-primary text-neutral-600">{date}</p>
          </div>
          <div className="flex gap-2">
            <TimeIcon />
            <p className="body-medium-primary text-neutral-600">{timeRange}</p>
          </div>
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
        <div className="flex flex-col gap-2">
          {/* First Row */}
          {displayFirstRow && (
            <div className="flex gap-1 flex-wrap">
              <QuickAttendButton
                variant="filled"
                width={180}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Go to Statistic Page from Card ${id}`);
                }}
              >
                <StatisticIcon type="outline" />
                <p className="translate-y-1">สถิติการลงทะเบียน</p>
              </QuickAttendButton>

              <QuickAttendButton
                variant="outline"
                width={45}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Download something from Card ${id}`);
                }}
              >
                <DownloadIcon />
              </QuickAttendButton>

              <div className="relative">
                <QuickAttendButton
                  variant="outline"
                  width={45}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Duplicate Card ${id}`);
                  }}
                >
                  <DuplicateIcon />
                </QuickAttendButton>
              </div>
            </div>
          )}

          {/* Second Row */}
          <div className="flex gap-1 flex-wrap">
            <QuickAttendButton
              variant="filled"
              width={280}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Go to Evaulation form from Card ${id}`);
              }}
            >
              <DocumentIcon />
              <p className="translate-y-1">แบบฟอร์มประเมินกิจกรรม</p>
            </QuickAttendButton>
          </div>
        </div>
      </div>

      {/* LLE Popup */}
      {openLLEPopup && <LLEPopup setOpenLLEPopup={setOpenLLEPopup} />}
    </div>
  );
}
