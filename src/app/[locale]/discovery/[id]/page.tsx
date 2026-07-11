"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import {
  CalendarMonth,
  ChevronRightOutlined,
  HomeOutlined,
  LocationOn,
  WatchLater,
} from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { usePageLoading } from "@/context/PageLoadingContext";
import MapPreview, { DEFAULT_CENTER } from "@/components/MapPreview";
import Footer from "@/components/Footer";
import { EventDetail, getEventById } from "@/service/event";
import { formatEventDateTime } from "@/utils/function";
import EventNotFound from "@/components/EventNotFound";
import { useUser } from "@/providers/UserProvider";

function DiscoveryEventDetail() {
  const { id } = useParams();
  const { userToken } = useUser();
  const locale = useLocale();
  const [event, setEvent] = useState<EventDetail | null>(null);

  const tEvent = useTranslations("event");
  const tBreadCrumb = useTranslations("breadcrumb");

  const { showPageLoading, hidePageLoading, pageLoading } = usePageLoading();

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
  }, [id, userToken]);

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
    <div className="w-full h-screen overflow-auto relative">
      {/* Content */}
      <div className="flex flex-col px-8 pt-8 pb-12">
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
          <Link
            className="flex gap-1 items-center"
            href="/discovery"
            onClick={() => {
              showPageLoading();
            }}
          >
            <p className="body-small-primary text-neutral-500">
              {tBreadCrumb("discovery")}
            </p>
          </Link>
          <ChevronRightOutlined fontSize="small" className="text-primary" />
          <Link
            className="flex gap-1 items-center"
            href={`/discovery/${id}`}
            onClick={() => {
              showPageLoading();
              window.location.reload();
            }}
          >
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

        {/* Event Map */}
        <div className="flex flex-col gap-2">
          <h2 className="title-large-emphasized text-neutral-600">
            {tEvent("viewMap")}
          </h2>

          <MapPreview
            lat={event.location_lat ?? DEFAULT_CENTER.location_lat}
            lng={event.location_long ?? DEFAULT_CENTER.location_long}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DiscoveryEventDetail;
