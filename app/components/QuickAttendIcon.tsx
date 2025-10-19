import React, { useState } from "react";
import LLEPopup from "./LLEPopup";

type QuickAttendIconProps = {
  iconName: string;
  type: "outline" | "filled";
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler;
};

export default function QuickAttendIcon({
  iconName,
  type,
  size = 24,
  className,
  onClick,
}: QuickAttendIconProps) {
  return (
    <img
      src={`/icon/${iconName}-${type}.svg`}
      width={size}
      height={size}
      alt={iconName}
      className={className}
      onClick={onClick}
    />
  );
}

export function ChevronLeftIcon() {
  return (
    <QuickAttendIcon
      iconName="chevron-right"
      type="filled"
      className="rotate-180"
      size={16}
    />
  );
}

export function ChevronRightIcon() {
  return <QuickAttendIcon iconName="chevron-right" type="filled" size={16} />;
}

export function ArrowUpIcon() {
  return <QuickAttendIcon iconName="up" type="outline" size={24} />;
}

export function DuplicateIcon() {
  return <QuickAttendIcon iconName="duplicate" type="filled" size={20} />;
}

export function DownloadIcon() {
  return <QuickAttendIcon iconName="download" type="filled" size={20} />;
}

export function DocumentIcon() {
  return <QuickAttendIcon iconName="document" type="outline" size={20} />;
}

export function SortIcon({
  setSortOption,
}: {
  setSortOption: (num: 0 | 1) => void;
}) {
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  return (
    <div className="relative">
      <QuickAttendIcon
        iconName="swap-vertical"
        type="filled"
        size={32}
        className="-translate-y-1 cursor-pointer"
        onClick={() => {
          setOpenSortDropdown((prev) => !prev);
        }}
      />
      {openSortDropdown && (
        <div className="w-60 absolute mb-1 -translate-x-[90%] bg-neutral-white rounded-lg shadow-elevation-1 p-2 z-10">
          <button
            className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
            onClick={(e) => {
              e.stopPropagation();
              setSortOption(0);
              setOpenSortDropdown(false);
            }}
          >
            วันที่จัดกิจกรรม : ใหม่สุด - เก่าสุด
          </button>
          <button
            className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
            onClick={(e) => {
              e.stopPropagation();
              setSortOption(1);
              setOpenSortDropdown(false);
            }}
          >
            วันที่จัดกิจกรรม : เก่าสุด - ใหม่สุด
          </button>
        </div>
      )}
    </div>
  );
}

export function UploadIcon() {
  return <QuickAttendIcon iconName="upload" type="filled" size={20} />;
}

export function StatisticIcon({ type }: { type: "outline" | "filled" }) {
  return <QuickAttendIcon iconName="statistic" type={type} size={20} />;
}

export function ScanIcon() {
  return <QuickAttendIcon iconName="scan" type="outline" size={20} />;
}

export function OwnerIcon() {
  return <QuickAttendIcon iconName="person" type="filled" size={16} />;
}

export function LocationIcon() {
  return <QuickAttendIcon iconName="location" type="filled" size={14} />;
}

export function TimeIcon() {
  return <QuickAttendIcon iconName="time" type="filled" size={14} />;
}

export function CalendarIcon() {
  return <QuickAttendIcon iconName="calendar" type="filled" size={14} />;
}

export function RedirectIcon() {
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  return (
    <>
      <QuickAttendIcon
        iconName="redirect"
        type="filled"
        size={24}
        className="-translate-y-1 cursor-pointer"
        onClick={() => {
          setOpenLLEPopup(true);
        }}
      />
      {openLLEPopup && <LLEPopup setOpenLLEPopup={setOpenLLEPopup} />}
    </>
  );
}

export function CompassIcon() {
  return (
    <QuickAttendIcon
      iconName="compass"
      type="filled"
      size={32}
      className="-translate-y-1 cursor-pointer"
      onClick={() => {
        alert("Go to Discovery Page");
      }}
    />
  );
}
