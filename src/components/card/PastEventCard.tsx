import { useState } from "react";

import {
  ExpandLess,
  ExpandMore,
  CalendarMonth,
  WatchLater,
  LocationOn,
  Person,
  SaveAlt,
  TrendingUp,
  Feed,
  DifferenceOutlined,
} from "@mui/icons-material";
import QuickAttendButton from "../QuickAttendButton";
import LLEPopup from "../popup/LLEPopup";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePageLoading } from "@/context/PageLoadingContext";
import { formatEventDateTime } from "@/utils/function";

interface PastEventCardProps {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  owner: string;
  evaluationFormPath: string | null;
  displayFirstRow: boolean;
}

export default function PastEventCard({
  id,
  name,
  startTime,
  endTime,
  location,
  description,
  owner,
  evaluationFormPath,
  displayFirstRow,
}: PastEventCardProps) {
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

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
    <div
      key={id}
      className={`w-full h-fit bg-neutral-100 rounded-4xl flex flex-col px-4 py-6 cursor-pointer transition-shadow`}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center gap-4"
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          setOpenDetail(prev => !prev);
        }}
      >
        <h2 className="title-large-emphasized text-neutral-600 translate-y-1 break-all line-clamp-2">
          {name}
        </h2>
        {openDetail ? (
          <ExpandLess sx={{ width: 20, height: 20 }} />
        ) : (
          <ExpandMore sx={{ width: 20, height: 20 }} />
        )}
      </div>

      {/* Expandable Section */}
      <Link
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          openDetail ? "min-h-30 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
        onClick={() => {
          showPageLoading();
        }}
        href={`/${locale}/pastevents/${id}`}
      >
        {/* Information */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex gap-2">
            <CalendarMonth
              sx={{ width: 14, height: 14 }}
              className="text-primary translate-y-1"
            />
            <p className="body-medium-primary text-neutral-600 break-all">
              {date}
            </p>
          </div>
          <div className="flex gap-2">
            <WatchLater
              sx={{ width: 14, height: 14 }}
              className="text-primary translate-y-1"
            />
            <p className="body-medium-primary text-neutral-600 break-all">
              {timeRange}
            </p>
          </div>
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
            {description ?? "-"}
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
        <div className="flex flex-col gap-2 mt-auto">
          {/* First Row */}
          {displayFirstRow && (
            <div className="flex gap-2 flex-wrap items-center">
              <QuickAttendButton
                type="text"
                variant="filled"
                onClick={e => {
                  e.stopPropagation();
                  hidePageLoading();
                  setOpenLLEPopup(true);
                  setToHref(
                    `${process.env.NEXT_PUBLIC_BACKOFFICE_PATH}/dashboard`
                  );
                  e.preventDefault();
                }}
              >
                <TrendingUp
                  sx={{ width: 20, height: 20 }}
                  className="text-neutral-white"
                />
                <p className="translate-y-1">{tEvent("registrationStats")}</p>
              </QuickAttendButton>

              <div className="flex gap-2 flex-1">
                <QuickAttendButton
                  type="icon"
                  variant="outline"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    // TODO: Download event report file from backend
                  }}
                >
                  <SaveAlt
                    sx={{ width: 20, height: 20 }}
                    className="text-primary"
                  />
                </QuickAttendButton>

                <QuickAttendButton
                  type="icon"
                  variant="outline"
                  onClick={e => {
                    e.stopPropagation();
                    hidePageLoading();
                    setOpenLLEPopup(true);
                    setToHref(
                      `${process.env.NEXT_PUBLIC_BACKOFFICE_PATH}/events/${id}`
                    );
                    e.preventDefault();
                  }}
                >
                  <DifferenceOutlined
                    sx={{ width: 20, height: 20 }}
                    className="text-primary"
                  />
                </QuickAttendButton>
              </div>
            </div>
          )}

          {/* Second Row */}
          <div className="flex gap-2 flex-wrap items-center">
            {evaluationFormPath && (
              <QuickAttendButton
                type="text"
                variant="filled"
                onClick={e => {
                  e.stopPropagation();
                  hidePageLoading();
                  setOpenLLEPopup(true);
                  setToHref(evaluationFormPath);
                  e.preventDefault();
                }}
              >
                <Feed
                  sx={{ width: 20, height: 20 }}
                  className="text-neutral-white"
                />
                <p className="translate-y-1">{tEvent("evaluationForm")}</p>
              </QuickAttendButton>
            )}
          </div>
        </div>
      </Link>

      {/* LLE Popup */}
      {openLLEPopup && (
        <LLEPopup setOpenLLEPopup={setOpenLLEPopup} tohref={tohref} />
      )}
    </div>
  );
}
