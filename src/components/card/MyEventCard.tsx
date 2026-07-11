import { useState } from "react";

import {
  CalendarMonth,
  MoreVert,
  CropFree,
  LocationOn,
  Person,
  WatchLater,
  TrendingUp,
} from "@mui/icons-material";
import QuickAttendButton from "../QuickAttendButton";
import LLEPopup from "../popup/LLEPopup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePageLoading } from "@/context/PageLoadingContext";
import { formatEventDateTime } from "@/utils/function";

interface MyEventCardProps {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  owner: string;
}

export default function MyEventCard({
  id,
  name,
  startTime,
  endTime,
  location,
  description,
  owner,
}: MyEventCardProps) {
  const router = useRouter();
  const [openLLEPopup, setOpenLLEPopup] = useState(false);

  const [tohref, setToHref] = useState("");

  const { showPageLoading, hidePageLoading } = usePageLoading();

  const locale = useLocale();

  const { date, timeRange } = formatEventDateTime(
    startTime,
    endTime,
    locale as "th-TH" | "en-US"
  );

  const tEvent = useTranslations("event");

  return (
    <Link
      key={id}
      className="w-full min-h-30 h-fit bg-neutral-100 rounded-4xl flex flex-col px-4 py-6 cursor-pointer overflow-visible"
      href={`/${locale}/myevents/${id}`}
      onClick={() => {
        showPageLoading();
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-1">
        <h2 className="title-large-emphasized text-neutral-600 break-all line-clamp-2">
          {name}
        </h2>
        <MoreVert
          sx={{ width: 20, height: 20 }}
          className="cursor-pointer -translate-y-1"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setOpenLLEPopup(true);
            setToHref(
              `${process.env.NEXT_PUBLIC_BACKOFFICE_PATH}/events/${id}`
            );
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
          <p className="body-medium-primary text-neutral-600 break-all">
            {date}
          </p>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <WatchLater
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600 break-all">
            {timeRange}
          </p>
        </div>

        {/* Location */}
        <div className="flex gap-2">
          <LocationOn
            sx={{ width: 14, height: 18 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600 break-all line-clamp-2">
            {location}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col mb-4">
        <h2 className="title-medium-emphasized text-neutral-600">
          {tEvent("details")}
        </h2>
        <p className="body-small-primary text-neutral-600 break-all line-clamp-5 whitespace-pre-wrap">
          {description || "-"}
        </p>
      </div>

      {/* Owner */}
      <div className="flex gap-2 mb-4">
        <Person
          sx={{ width: 16, height: 16 }}
          className="text-primary translate-y-1"
        />
        <p className="body-small-primary text-neutral-600 break-all line-clamp-1">
          {owner}
        </p>
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
            showPageLoading();
            router.push(`/scan/${id}`);
          }}
        >
          <CropFree
            sx={{ width: 20, height: 20 }}
            className="text-neutral-white"
          />
          <p>{tEvent("scanParticipants")}</p>
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
                hidePageLoading();
                setOpenLLEPopup(true);
                setToHref(
                  `${process.env.NEXT_PUBLIC_BACKOFFICE_PATH}/dashboard/${id}`
                );
              }}
            >
              <TrendingUp sx={{ width: 20, height: 20 }} />
              {tEvent("registrationStats")}
            </QuickAttendButton>

            {/* Dummy Box */}
            <div className="w-30 hidden absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-white rounded-lg shadow-elevation-1 p-2 z-10"></div>
          </div>
        </div>

        {openLLEPopup && (
          <LLEPopup setOpenLLEPopup={setOpenLLEPopup} tohref={tohref} />
        )}
      </div>
    </Link>
  );
}
