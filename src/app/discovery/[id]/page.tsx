"use client";

import {
  eventDate,
  eventDescription,
  eventLocation,
  eventOwner,
  eventSchedules,
  eventTimeRange,
  allEvents,
} from "@/utils/const";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import {
  ArrowUpward,
  CalendarMonth,
  ChevronRightOutlined,
  HomeOutlined,
  LocationOn,
  WatchLater,
} from "@mui/icons-material";
import Image from "next/image";
import { EventInterface } from "@/utils/interface";

function DiscoveryEventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [isInvisibleScrollToTop, setInvisibleScrollToTop] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetEvent = allEvents.filter(e => e.id === id)[0] ?? null;
    if (!targetEvent) {
      return;
    }
    setEvent(targetEvent);
  }, [id]);

  // Check whether users reach the bottom or not
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInvisibleScrollToTop(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  return (
    <div
      ref={topRef}
      className="w-full h-screen overflow-auto relative flex flex-col px-8 pt-8 pb-12"
    >
      {/* Breadcrumb */}
      <div className="flex gap-1 mb-6 items-center flex-wrap">
        <Link className="flex gap-1 items-center" href="/">
          <HomeOutlined fontSize="small" className="text-primary" />
          <p className="body-small-primary text-neutral-500">หน้าหลัก</p>
        </Link>
        <ChevronRightOutlined fontSize="small" className="text-primary" />
        <Link className="flex gap-1 items-center" href="/discovery">
          <p className="body-small-primary text-neutral-500">สำรวจกิจกรรม</p>
        </Link>
        <ChevronRightOutlined fontSize="small" className="text-primary" />
        <Link className="flex gap-1 items-center" href={`/discovery/${id}`}>
          <p className="body-small-primary text-neutral-500 truncate max-w-[120px]">
            {event?.name}
          </p>
        </Link>
      </div>

      {/* Event Name */}
      <h1 className="headline-large-emphasized text-neutral-600 mb-4">
        {event?.name}
      </h1>

      {/* Event Information */}
      <div className="flex flex-col gap-1 mb-6">
        {/* Date */}
        <div className="flex gap-2">
          <CalendarMonth
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600">{eventDate}</p>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <WatchLater
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600">
            {eventTimeRange}
          </p>
        </div>

        {/* Location */}
        <div className="flex gap-2">
          <LocationOn
            sx={{ width: 14, height: 18 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600">
            {eventLocation}
          </p>
        </div>
      </div>

      {/* Event Description */}
      <div className="flex flex-col mb-6 gap-2">
        <h2 className="title-large-emphasized text-neutral-600">
          รายละเอียดกิจกรรม
        </h2>
        <p className="body-medium-primary text-neutral-600">
          {eventDescription}
        </p>
      </div>

      {/* Event Schedule */}
      <div className="flex flex-col mb-6 gap-2">
        <h2 className="title-large-emphasized text-neutral-600">
          กำหนดการกิจกรรม
        </h2>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {eventSchedules.map((e, i) => (
            <Fragment key={i}>
              <p className="body-medium-primary text-neutral-600">{e[0]}</p>
              <p className="body-medium-primary text-neutral-600 text-right">
                {e[1]}
              </p>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Event Owner */}
      <div className="flex flex-col mb-6 gap-2">
        <h2 className="title-large-emphasized text-neutral-600">
          ผู้จัดกิจกรรม
        </h2>
        <p className="body-medium-primary text-neutral-600">{eventOwner}</p>
      </div>

      {/* Event Map */}
      <div className="flex flex-col gap-2">
        <h2 className="title-large-emphasized text-neutral-600">ดูแผนที่</h2>
        <Image src={"/mock/map.png"} alt="mock map" width={350} height={180} />
      </div>

      {/* Go to Top Button */}
      <button
        className={`fixed right-8 bottom-12 p-4 w-14 h-14 rounded-full bg-primary z-50 cursor-pointer ${
          isInvisibleScrollToTop ? "hidden" : "block"
        }`}
        onClick={() => topRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpward sx={{ width: 24, height: 24 }} className="text-white" />
      </button>
    </div>
  );
}

export default DiscoveryEventDetail;
