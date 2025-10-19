"use client";

import { useEffect, useRef, useState } from "react";
import MyEventCard from "./components/MyEventCard";
import { HandleEventButton } from "./components/QuickAttendButton";
import {
  CompassIcon,
  RedirectIcon,
  SortIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./components/QuickAttendIcon";
import PastEventCard from "./components/PastEventCard";

export default function Home() {
  // === Mock Data ===
  const eventName = "Freshmen night";
  const eventDate = "3 สิงหาคม 2568";
  const eventTimeRange = "16:00 - 20:00 น.";
  const eventLocation = "สนามกีฬาจุฬาลงกรณ์มหาวิทยาลัย";
  const eventDescription =
    "กิจกรรมต้อนรับนิสิตใหม่ CU รุ่น 109 สู่รั้วมหาวิทยาลัย และ กระชับสัมพันธ์ อันดีระหว่างน้องใหม่คณะต่างๆภาย ในงานมีการจัด แสดงดนตรีโดยวงดนตรี อาทิเช่น Landokmai, Dept, Polycat, Tilly Birds, การแสดง พิเศษจาก CUDC และละครนิเทศ จุฬาฯ";
  const eventOwner = "ผู้จัดการกิจกรรม";

  const maxPageNumber = 10;
  // =================

  const [sortOption, setSortOption] = useState<0 | 1 | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const scrollRef = useRef<HTMLDivElement>(null);

  // When there's a change in sort option
  useEffect(() => {
    if (sortOption == 0) {
      // Newest - Oldest
      alert("Sorting from new to old");
    } else if (sortOption == 1) {
      // Oldest - Newest
      alert("Sorting from old to new");
    }
  }, [sortOption]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-screen overflow-auto relative flex flex-col px-8 py-12"
    >
      {/* My Events */}
      <div className="mb-12">
        {/* Header */}
        <div className="flex justify-between gap-4 mb-6">
          <h1 className="headline-small-emphasized text-neutral-600">
            กิจกรรมของฉัน
          </h1>
          <CompassIcon />
        </div>

        {/* Number of Results */}
        <div className="flex justify-between items-center gap-4 mb-4">
          <p className="label-small-primary text-neutral-600">
            แสดงกิจกรรม 3 จาก 6
          </p>
          <div className="flex items-center gap-2">
            <p className="label-large-primary text-neutral-600">ดูทั้งหมด</p>
            <RedirectIcon />
          </div>
        </div>

        {/* Events */}
        <div className="flex flex-col gap-4 mb-6">
          {["1", "2", "3"].map((id) => {
            return (
              <MyEventCard
                key={id}
                id={id}
                name={eventName}
                date={eventDate}
                timeRange={eventTimeRange}
                location={eventLocation}
                description={eventDescription}
                owner={eventOwner}
              />
            );
          })}
        </div>

        {/* Button */}
        <div className="flex flex-col items-center gap-2">
          <HandleEventButton />
          <p className="label-small-primary text-neutral-400">
            เข้าสู่ Backoffice เพื่อจัดการและแก้ไขกิจกรรม
          </p>
        </div>
      </div>

      {/* Past Events */}
      <div className="mb-6">
        {/* Header */}
        <div className="flex justify-between gap-4 mb-6">
          <h1 className="headline-small-emphasized text-neutral-600">
            กิจกรรมที่ผ่านมา
          </h1>
          <SortIcon setSortOption={setSortOption} />
        </div>

        {/* Events */}
        <div className="flex flex-col gap-4">
          {["1", "2", "3"].map((id) => {
            return (
              <PastEventCard
                key={id}
                id={id}
                name={eventName}
                date={eventDate}
                timeRange={eventTimeRange}
                location={eventLocation}
                description={eventDescription}
                owner={eventOwner}
                displayFirstRow={true}
              />
            );
          })}
        </div>
      </div>

      {/* Page Number Buttons */}
      <div className="flex justify-between items-center gap-4">
        {/* Left */}
        <button
          className="p-2 w-8 h-8 rounded-full bg-neutral-white border border-neutral-300 z-50 cursor-pointer"
          onClick={() => {
            if (currentPageNumber > 1) {
              setCurrentPageNumber((prev) => prev - 1);
            }
          }}
        >
          <ChevronLeftIcon />
        </button>

        {/* Numbers */}
        <div className="flex items-center gap-2">
          {(() => {
            const pages: (number | "...")[] = [];

            if (maxPageNumber <= 5) {
              for (let i = 1; i <= maxPageNumber; i++) pages.push(i);
            } else {
              if (currentPageNumber <= 2) {
                pages.push(1, 2, 3, "...", maxPageNumber);
              } else if (currentPageNumber >= maxPageNumber - 1) {
                pages.push(
                  1,
                  "...",
                  maxPageNumber - 2,
                  maxPageNumber - 1,
                  maxPageNumber
                );
              } else {
                pages.push(1, "...", currentPageNumber, "...", maxPageNumber);
              }
            }

            return pages.map((page, index) => {
              const isActive = page === currentPageNumber;
              const isEllipsis = page === "...";

              return (
                <button
                  key={index}
                  className={`p-2 w-8 h-8 rounded-full bg-neutral-white border z-50 label-large-primary ${
                    isEllipsis
                      ? "border-neutral-300 cursor-default"
                      : isActive
                      ? "bg-primary border-primary text-neutral-white cursor-pointer"
                      : "border-neutral-300 text-neutral-600 cursor-pointer"
                  }`}
                  disabled={isEllipsis}
                  onClick={() => {
                    if (typeof page === "number") {
                      setCurrentPageNumber(page);
                    }
                  }}
                >
                  {page}
                </button>
              );
            });
          })()}
        </div>

        {/* Right */}
        <button
          className="p-2 w-8 h-8 rounded-full bg-neutral-white border border-neutral-300 z-50 cursor-pointer"
          onClick={() => {
            if (currentPageNumber < maxPageNumber) {
              setCurrentPageNumber((prev) => prev + 1);
            }
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Go to Top Button */}
      <button
        className="fixed right-8 bottom-12 p-4 w-14 h-14 rounded-full bg-primary z-50 cursor-pointer"
        onClick={() =>
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
}
