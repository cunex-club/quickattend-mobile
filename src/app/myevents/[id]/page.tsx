"use client";

import {
  displayButtonsFirstRowPastEvents,
  eventDate,
  eventDescription,
  eventLocation,
  eventName,
  eventOwner,
  eventSchedules,
  eventTimeRange,
} from "@/utils/const";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import {
  ArrowUpward,
  CalendarMonth,
  ChevronRightOutlined,
  CropFree,
  DifferenceOutlined,
  Feed,
  HomeOutlined,
  LocationOn,
  SaveAlt,
  TrendingUp,
  UploadFile,
  WatchLater,
} from "@mui/icons-material";
import QuickAttendButton from "@/components/QuickAttendButton";
import LLEPopup from "@/components/LLEPopup";

function MyEventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isInvisibleScrollToTop, setInvisibleScrollToTop] = useState(false);
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [openShareDropdown, setOpenShareDropdown] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
        <Link className="flex gap-1 items-center" href={`/${id}`}>
          <p className="body-small-primary text-neutral-500">{eventName}</p>
        </Link>
      </div>

      {/* Event Name */}
      <h1 className="headline-large-emphasized text-neutral-600 mb-4">
        {eventName}
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

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Scan Button */}
        <QuickAttendButton
          type="text"
          variant="filled"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            router.push(`/scan/${id}`);
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
                  className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-300"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`/scan/${id}`);
                    setOpenShareDropdown(false);
                  }}
                >
                  ตัวสแกน QR
                </button>
                <button
                  className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-300"
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

      {/* Go to Top Button */}
      <button
        className={`fixed right-8 bottom-12 p-4 w-14 h-14 rounded-full bg-primary z-50 cursor-pointer ${
          isInvisibleScrollToTop ? "hidden" : "block"
        }`}
        onClick={() => topRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpward sx={{ width: 24, height: 24 }} className="text-white" />
      </button>

      {openLLEPopup && <LLEPopup setOpenLLEPopup={setOpenLLEPopup} />}
    </div>
  );
}

export default MyEventDetail;
