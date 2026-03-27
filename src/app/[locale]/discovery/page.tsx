"use client";

import DiscoveryEventCard from "@/components/card/DiscoveryEventCard";
import Footer from "@/components/Footer";
import { usePageLoading } from "@/context/PageLoadingContext";
import { useUser } from "@/providers/UserProvider";
import { Event, getEvents, PaginationMeta } from "@/service/event";
import { EVENTS_PER_PAGE } from "@/utils/const";

import {
  ChevronLeft,
  ChevronRight,
  ChevronRightOutlined,
  HomeOutlined,
  SwapVert,
} from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Discovery() {
  const [sortOption, setSortOption] = useState<0 | 1 | null>(null);
  const { userToken } = useUser();
  const locale = useLocale();
  const [currentDiscoveryPageNumber, setCurrentDiscoveryPageNumber] =
    useState<number>(1);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [discoveryPaginationMeta, setDiscoveryPaginationMeta] =
    useState<PaginationMeta | null>(null);

  const tDiscovery = useTranslations("discovery");
  const tBreadCrumb = useTranslations("breadcrumb");

  const { showPageLoading, hidePageLoading } = usePageLoading();

  useEffect(() => {
    const fetchDiscoveryEvents = async () => {
      showPageLoading();
      setEvents([]);
      try {
        const fetchedDiscoveryInformation = await getEvents(
          userToken,
          undefined,
          currentDiscoveryPageNumber - 1,
          EVENTS_PER_PAGE
        );

        setEvents(fetchedDiscoveryInformation.events);
        setDiscoveryPaginationMeta(fetchedDiscoveryInformation.meta);
      } catch (err) {
        console.error(err);
        setEvents([]);
      } finally {
        hidePageLoading();
      }
    };

    if (userToken) fetchDiscoveryEvents();
  }, [userToken, currentDiscoveryPageNumber]);

  // When there's a change in sort option
  const sortedEvents = useMemo(() => {
    if (sortOption === 1) {
      return [...events].sort(
        (a, b) =>
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );
    }

    return [...events].sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    );
  }, [events, sortOption]);

  const maxPageNumber = discoveryPaginationMeta
    ? Math.max(
        1,
        Math.ceil(
          discoveryPaginationMeta.pagination.total /
            discoveryPaginationMeta.pagination.pageSize
        )
      )
    : 1;

  const paginatedEvents = sortedEvents;

  return (
    <div className="h-screen flex flex-col bg-neutral-white">
      {/* Content */}
      <div className="flex-1 w-full px-8 pt-8">
        <div className="w-full flex flex-col">
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
            <Link className="flex gap-1 items-center" href="/discovery">
              <p className="body-small-primary text-neutral-500">
                {tBreadCrumb("discovery")}
              </p>
            </Link>
          </div>

          {/* Events */}
          <div className="mb-6">
            {/* Header */}
            <div className="flex justify-between gap-4 mb-6 relative">
              <h1 className="headline-small-emphasized text-neutral-600">
                {tDiscovery("explore")}
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
                      {tDiscovery("sortNewestOldest")}
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
                      {tDiscovery("sortOldestNewest")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Events */}
            <div className="flex flex-col gap-4">
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map(event => {
                  return (
                    <DiscoveryEventCard
                      key={event.id}
                      id={event.id}
                      name={event.name}
                      startTime={event.start_time}
                      endTime={event.end_time}
                      location={event.location}
                      description={event.description}
                    />
                  );
                })
              ) : (
                <p className="label-small-primary text-center text-neutral-600 my-6">
                  {tDiscovery("noEvents")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Page Number Buttons */}
      <div className="flex justify-between items-center gap-2 px-8 py-6">
        {/* Left */}
        <button
          className="p-2 w-8 h-8 rounded-full bg-neutral-white border border-neutral-300 cursor-pointer"
          onClick={() => {
            if (currentDiscoveryPageNumber > 1)
              setCurrentDiscoveryPageNumber(prev => prev - 1);
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
              if (currentDiscoveryPageNumber <= 2) {
                pages.push(1, 2, 3, "...", maxPageNumber);
              } else if (currentDiscoveryPageNumber >= maxPageNumber - 1) {
                pages.push(
                  1,
                  "...",
                  maxPageNumber - 2,
                  maxPageNumber - 1,
                  maxPageNumber
                );
              } else {
                pages.push(
                  1,
                  "...",
                  currentDiscoveryPageNumber,
                  "...",
                  maxPageNumber
                );
              }
            }

            return pages.map((page, index) => {
              const isActive = page === currentDiscoveryPageNumber;
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
                    typeof page === "number" &&
                    setCurrentDiscoveryPageNumber(page)
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
            if (currentDiscoveryPageNumber < maxPageNumber) {
              setCurrentDiscoveryPageNumber(prev => prev + 1);
            }
          }}
        >
          <ChevronRight
            sx={{ width: 16, height: 16 }}
            className="text-primary -translate-y-0.5"
          />
        </button>
      </div>

      <Footer />
    </div>
  );
}
