"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import {
  CalendarMonth,
  ChevronRightOutlined,
  CropFree,
  HomeOutlined,
  LocationOn,
  TrendingUp,
  UploadFile,
  WatchLater,
} from "@mui/icons-material";
import QuickAttendButton from "@/components/QuickAttendButton";
import LLEPopup from "@/components/popup/LLEPopup";
import { useLocale, useTranslations } from "next-intl";
import { usePageLoading } from "@/context/PageLoadingContext";
import Footer from "@/components/Footer";
import { EventDetail, getEventById } from "@/service/event";
import { useUser } from "@/providers/UserProvider";
import EventNotFound from "@/components/EventNotFound";
import { formatEventDateTime } from "@/utils/function";

function MyEventDetail() {
  const { id } = useParams();
  const { userToken } = useUser();
  const router = useRouter();
  const locale = useLocale();
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [openShareDropdown, setOpenShareDropdown] = useState(false);
  const [event, setEvent] = useState<EventDetail | null>(null);

  const [tohref, setToHref] = useState("");

  const { showPageLoading, hidePageLoading, pageLoading } = usePageLoading();

  const tEvent = useTranslations("event");
  const tBreadCrumb = useTranslations("breadcrumb");
  const tScan = useTranslations("scan");

  useEffect(() => {
    async function fetchEvent() {
      if (!userToken || !id) return;

      showPageLoading();
      try {
        const res = await getEventById(userToken, id as string);
        setEvent(res);
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        hidePageLoading();
      }
    }

    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-neutral-white">
        {!pageLoading && <EventNotFound />}

        <Footer />
      </div>
    );
  }

  const { date, timeRange } = formatEventDateTime(
    event.start_time,
    event.end_time,
    locale as "th-TH" | "en-US"
  );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-white">
      {/* Content */}
      <div className="flex-1 w-full overflow-auto">
        <div className="w-full flex flex-col px-8 pt-8 pb-12">
          {/* Breadcrumb */}
          <div className="flex gap-1 mb-6 items-center flex-wrap">
            <Link
              className="flex gap-1 items-center"
              href={`/${locale}`}
              onClick={() => {
                showPageLoading();
              }}
            >
              <HomeOutlined fontSize="small" className="text-primary" />
              <p className="body-small-primary text-neutral-500">
                {tBreadCrumb("home")}
              </p>
            </Link>
            <ChevronRightOutlined fontSize="small" className="text-primary" />
            <Link className="flex gap-1 items-center" href={`/myevents/${id}`}>
              <p className="body-small-primary text-neutral-500 truncate max-w-[120px]">
                {event.name}
              </p>
            </Link>
          </div>

          {/* Event Name */}
          <h1 className="headline-large-emphasized text-neutral-600 mb-4 break-all">
            {event.name}
          </h1>

          {/* Event Information */}
          <div className="flex flex-col gap-1 mb-6">
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
              <p className="body-medium-primary text-neutral-600 break-all">
                {event.location}
              </p>
            </div>
          </div>

          {/* Event Description */}
          <div className="flex flex-col mb-6 gap-2">
            <h2 className="title-large-emphasized text-neutral-600">
              {tEvent("details")}
            </h2>
            <p className="body-medium-primary text-neutral-600 break-all">
              {event.description ?? "-"}
            </p>
          </div>

          {/* Event Schedule */}
          <div className="flex flex-col mb-6 gap-2">
            <h2 className="title-large-emphasized text-neutral-600">
              {tEvent("schedule")}
            </h2>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {event.agenda.length > 0 ? (
                event.agenda.map((e, i) => {
                  const { timeRange } = formatEventDateTime(
                    e.start_time,
                    e.end_time,
                    locale as "th-TH" | "en-US"
                  );
                  return (
                    <Fragment key={i}>
                      <p className="body-medium-primary text-neutral-600 break-all">
                        {e.activity_name}
                      </p>
                      <p className="body-medium-primary text-neutral-600 text-right break-all">
                        {timeRange}
                      </p>
                    </Fragment>
                  );
                })
              ) : (
                <p className="body-medium-primary text-neutral-600 break-all">
                  -
                </p>
              )}
            </div>
          </div>

          {/* Event Owner */}
          <div className="flex flex-col mb-6 gap-2">
            <h2 className="title-large-emphasized text-neutral-600">
              {tEvent("organizer")}
            </h2>
            <p className="body-medium-primary text-neutral-600 break-all">
              {event.organizer}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
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
              <p className="translate-y-1">{tEvent("scanParticipants")}</p>
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
                    setToHref(
                      `${process.env.NEXT_PUBLIC_BACKOFFICE_PATH}/dashboard`
                    );
                  }}
                >
                  <TrendingUp sx={{ width: 20, height: 20 }} />
                </QuickAttendButton>
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
                      className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-300"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        showPageLoading();
                        router.push(`/scan/${id}`);
                        setOpenShareDropdown(false);
                      }}
                    >
                      {tScan("scannerQR")}
                    </button>
                    <button
                      className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-300"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpenShareDropdown(false);
                      }}
                    >
                      {tScan("dashboard")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {openLLEPopup && (
        <LLEPopup setOpenLLEPopup={setOpenLLEPopup} tohref={tohref} />
      )}
    </div>
  );
}

export default MyEventDetail;
