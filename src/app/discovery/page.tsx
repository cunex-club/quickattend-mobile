"use client";

import DiscoveryEventCard from "@/components/DiscoveryEventCard";
import {
  ArrowUpward,
  ChevronLeft,
  ChevronRight,
  ChevronRightOutlined,
  HomeOutlined,
  SwapVert,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Discovery() {
  // === Mock Data ===
  const eventName = "Freshmen night";
  const eventDate = "3 สิงหาคม 2568";
  const eventTimeRange = "16:00 - 20:00 น.";
  const eventLocation = "สนามกีฬาจุฬาลงกรณ์มหาวิทยาลัย";
  const eventDescription =
    "กิจกรรมต้อนรับนิสิตใหม่ CU รุ่น 109 สู่รั้วมหาวิทยาลัย และ กระชับสัมพันธ์ อันดีระหว่างน้องใหม่คณะต่างๆภาย ในงานมีการจัด แสดงดนตรีโดยวงดนตรี อาทิเช่น Landokmai, Dept, Polycat, Tilly Birds, การแสดง พิเศษจาก CUDC และละครนิเทศ จุฬาฯ";

  const maxPageNumber = 10;
  // =================

  const [sortOption, setSortOption] = useState<0 | 1 | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [isInvisibleScrollToTop, setInvisibleScrollToTop] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      <div className="flex gap-1 mb-6 items-center">
        <Link className="flex gap-1 items-center" href="/">
          <HomeOutlined fontSize="small" className="text-primary" />
          <p className="body-small-primary text-neutral-500">หน้าหลัก</p>
        </Link>
        <ChevronRightOutlined fontSize="small" className="text-primary" />
        <Link className="flex gap-1 items-center" href="/discovery">
          <p className="body-small-primary text-neutral-500">สำรวจกิจกรรม</p>
        </Link>
      </div>

      {/* Events */}
      <div className="mb-6">
        {/* Header */}
        <div className="flex justify-between gap-4 mb-6 relative">
          <h1 className="headline-small-emphasized text-neutral-600">
            สำรวจกิจกรรม
          </h1>
          <div className="relative h-fit">
            <SwapVert
              sx={{ width: 32, height: 32 }}
              className="text-primary cursor-pointer -translate-y-1"
              onClick={() => {
                setOpenSortDropdown(prev => !prev);
              }}
            />
            {openSortDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-neutral-white rounded-lg shadow-elevation-1 px-3 py-2 z-10 min-w-48">
                <button
                  className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSortOption(0);
                    setOpenSortDropdown(false);
                  }}
                >
                  วันที่จัดกิจกรรม: ใหม่สุด-เก่าสุด
                </button>
                <button
                  className="cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSortOption(1);
                    setOpenSortDropdown(false);
                  }}
                >
                  วันที่จัดกิจกรรม: เก่าสุด-ใหม่สุด
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Events */}
        <div className="flex flex-col gap-4">
          {["1", "2", "3"].map(id => {
            return (
              <DiscoveryEventCard
                key={id}
                id={id}
                name={eventName}
                date={eventDate}
                timeRange={eventTimeRange}
                location={eventLocation}
                description={eventDescription}
              />
            );
          })}
        </div>
      </div>

      {/* Page Number Buttons */}
      <div className="flex justify-between items-center gap-2" ref={bottomRef}>
        {/* Left */}
        <button
          className="p-2 w-8 h-8 rounded-full bg-neutral-white border border-neutral-300 cursor-pointer"
          onClick={() => {
            if (currentPageNumber > 1) setCurrentPageNumber(prev => prev - 1);
          }}
        >
          <ChevronLeft
            sx={{ width: 16, height: 16 }}
            className="text-primary -translate-y-0.5"
          />
        </button>

        {/* Numbers */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
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
                  className={`p-2 w-8 h-8 rounded-full bg-neutral-white border label-large-primary ${
                    isEllipsis
                      ? "border-neutral-300 cursor-default"
                      : isActive
                        ? "bg-primary border-primary text-neutral-white cursor-pointer"
                        : "border-neutral-300 text-neutral-600 cursor-pointer"
                  }`}
                  disabled={isEllipsis}
                  onClick={() =>
                    typeof page === "number" && setCurrentPageNumber(page)
                  }
                >
                  {page}
                </button>
              );
            });
          })()}
        </div>

        {/* Right */}
        <button
          className="p-2 w-8 h-8 rounded-full bg-neutral-white border border-neutral-300 cursor-pointer"
          onClick={() => {
            if (currentPageNumber < maxPageNumber)
              setCurrentPageNumber(prev => prev + 1);
          }}
        >
          <ChevronRight
            sx={{ width: 16, height: 16 }}
            className="text-primary -translate-y-0.5"
          />
        </button>
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
