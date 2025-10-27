import { useState } from "react";

import {
  CalendarMonth,
  MoreVert,
  CropFree,
  LocationOn,
  Person,
  WatchLater,
  TrendingUp,
  UploadFile,
} from "@mui/icons-material";
import QuickAttendButton from "./QuickAttendButton";
import LLEPopup from "./LLEPopup";
import Link from "next/link";

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
    <Link
      key={id}
      className="w-full min-h-30 h-fit bg-neutral-100 rounded-4xl flex flex-col px-4 py-6 cursor-pointer overflow-visible"
      href={`/myevents/${id}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-1">
        <h2 className="title-large-emphasized text-neutral-600">{name}</h2>
        <MoreVert
          sx={{ width: 20, height: 20 }}
          className="cursor-pointer -translate-y-1"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setOpenLLEPopup(true);
          }}
        />
      </div>

      {/* Information */}
      <div className="flex flex-col gap-1 mb-4">
        {/* Date */}
        <div className="flex gap-2">
          <CalendarMonth
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600">{date}</p>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <WatchLater
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600">{timeRange}</p>
        </div>

        {/* Location */}
        <div className="flex gap-2">
          <LocationOn
            sx={{ width: 14, height: 18 }}
            className="text-primary translate-y-1"
          />
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
        <Person
          sx={{ width: 16, height: 16 }}
          className="text-primary translate-y-1"
        />
        <p className="body-small-primary text-neutral-600">{owner}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {/* Scan Button */}
        <QuickAttendButton
          type="text"
          variant="filled"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            alert(`Go to Scan from Card ${id}`);
          }}
        >
          <CropFree
            sx={{ width: 20, height: 20 }}
            className="text-neutral-white"
          />
          <p className="translate-y-1">สแกนผู้เข้าร่วมกิจกรรม</p>
        </QuickAttendButton>

        <div className="flex gap-2 flex-1 items-center">
          {/* Stats Button */}
          <div className="relative flex-1">
            <QuickAttendButton
              variant="outline"
              type="icon"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setOpenLLEPopup(true);
              }}
            >
              <TrendingUp sx={{ width: 20, height: 20 }} />
            </QuickAttendButton>

            {/* Dummy Box */}
            <div className="w-30 hidden absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-white rounded-lg shadow-elevation-1 p-2 z-10"></div>
          </div>

          {/* Share Button */}
          <div className="relative flex-1">
            <QuickAttendButton
              type="icon"
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setOpenShareDropdown(prev => !prev);
              }}
            >
              <UploadFile
                sx={{ width: 20, height: 20 }}
                className="text-primary"
              />
            </QuickAttendButton>

            {/* Share Dropdown */}
            {openShareDropdown && (
              <div className="w-30 absolute bottom-full mb-1 right-0 bg-neutral-white rounded-lg shadow-elevation-1 p-2 z-10">
                <button
                  className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOpenShareDropdown(false);
                  }}
                >
                  ตัวสแกน QR
                </button>
                <button
                  className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOpenShareDropdown(false);
                  }}
                >
                  แดชบอร์ด
                </button>
              </div>
            )}
          </div>
        </div>

        {openLLEPopup && <LLEPopup setOpenLLEPopup={setOpenLLEPopup} />}
      </div>
    </Link>
  );
}
