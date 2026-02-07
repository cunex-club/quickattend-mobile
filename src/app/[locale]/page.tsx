"use client";

import { useEffect, useRef, useState } from "react";
import MyEventCard from "@/components/card/MyEventCard";
import QuickAttendButton from "@/components/QuickAttendButton";
import PastEventCard from "@/components/card/PastEventCard";
import {
  ExploreOutlined,
  OpenInNew,
  SwapVert,
  ArrowUpward,
  ChevronLeft,
  ChevronRight,
  AddCircleOutline,
} from "@mui/icons-material";
import LLEPopup from "@/components/popup/LLEPopup";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePageLoading } from "@/context/PageLoadingContext";
import Footer from "@/components/Footer";
import { Event, getEvents } from "@/service/event";
import { useUser } from "@/providers/UserProvider";

export default function Home() {
  const [sortOption, setSortOption] = useState<0 | 1 | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [tohref, setToHref] = useState("");

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { userToken } = useUser();
  const { showPageLoading, hidePageLoading, pageLoading } = usePageLoading();

  const tHome = useTranslations("home");

  const EVENTS_PER_PAGE = 4;

  useEffect(() => {
    const fetchManagedEvents = async () => {
      showPageLoading();
      try {
        const events = await getEvents(userToken, true);
        const now = new Date();

        const current = events.filter(e => new Date(e.end_time) >= now);
        const past = events
          .filter(e => new Date(e.end_time) < now)
          .sort(
            (a, b) =>
              new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
          );

        setCurrentEvents(current);
        setPastEvents(past);
      } catch (err) {
        console.error(err);
        setCurrentEvents([]);
        setPastEvents([]);
      } finally {
        hidePageLoading();
      }
    };

    if (userToken) fetchManagedEvents();
  }, [userToken]);

  // When there's a change in sort option
  const sortedPastEvents = (() => {
    // Oldest -> Newest
    if (sortOption === 1) {
      return [...pastEvents].sort(
        (a, b) =>
          new Date(a.end_time).getTime() - new Date(b.end_time).getTime()
      );
    }

    // Newest -> Oldest
    return [...pastEvents].sort(
      (a, b) => new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
    );
  })();

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [sortOption]);

  const maxPageNumber = Math.max(
    1,
    Math.ceil(pastEvents.length / EVENTS_PER_PAGE)
  );

  const paginatedPastEvents = sortedPastEvents.slice(
    (currentPageNumber - 1) * EVENTS_PER_PAGE,
    currentPageNumber * EVENTS_PER_PAGE
  );

  return (
    <div ref={topRef} className="min-h-screen flex flex-col bg-neutral-white">
      {/* Content */}
      <div className="flex-1 w-full overflow-auto">
        <div className="w-full flex flex-col px-8 pt-8 pb-12">
          {/* My Events */}
          <div className="mb-12">
            {/* Header */}
            <div className="flex justify-between gap-3 mb-6">
              <h1 className="headline-small-emphasized text-neutral-600">
                {tHome("myEvents")}
              </h1>

              <div className="flex items-center gap-2 -translate-y-2 flex-wrap justify-end">
                <QuickAttendButton
                  type="text"
                  variant="outline"
                  onClick={() => {
                    setOpenLLEPopup(true);
                  }}
                >
                  <AddCircleOutline
                    sx={{ width: 14, height: 14 }}
                    className="text-primary"
                  />
                  <p className="translate-y-1 label-large-primary">
                    {tHome("createEvent")}
                  </p>
                </QuickAttendButton>
                <Link
                  href={"/discovery"}
                  onClick={() => {
                    showPageLoading();
                  }}
                >
                  <ExploreOutlined
                    sx={{ width: 24, height: 24 }}
                    className="text-primary cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            {/* Number of Results */}
            <div className="flex justify-between items-center gap-4 mb-4">
              <p className="label-small-primary text-neutral-600">
                {tHome("showingCurrentEvents", {
                  count: currentEvents.length,
                  plural: currentEvents.length != 1 ? "s" : "",
                })}
              </p>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setOpenLLEPopup(true);
                }}
              >
                <p className="label-large-primary text-neutral-600">
                  {tHome("viewAll")}
                </p>
                <OpenInNew
                  sx={{ width: 16, height: 16 }}
                  className="text-primary -translate-y-1"
                />
              </div>
            </div>

            {/* Events */}
            <div className="flex flex-col gap-4 mb-6">
              {currentEvents.length > 0 ? (
                currentEvents.map(event => {
                  return (
                    <MyEventCard
                      key={event.id}
                      id={event.id}
                      name={event.name}
                      startTime={event.start_time}
                      endTime={event.end_time}
                      location={event.location}
                      description={event.description}
                      owner={event.organizer}
                    />
                  );
                })
              ) : (
                <p className="label-small-primary text-center text-neutral-600 my-6">
                  {tHome("noEvents")}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="flex flex-col items-center gap-2">
              <QuickAttendButton
                variant="filled"
                type="text"
                onClick={() => setOpenLLEPopup(true)}
              >
                <p className="translate-y-1">{tHome("manageEvents")}</p>
              </QuickAttendButton>
              <p className="label-small-primary text-neutral-400">
                {tHome("backofficeNote")}
              </p>
            </div>
          </div>

          {/* Past Events */}
          <div className="mb-6">
            {/* Header */}
            <div className="flex justify-between gap-4 mb-6 relative">
              <h1 className="headline-small-emphasized text-neutral-600">
                {tHome("pastEvents")}
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
                      {tHome("sortNewestOldest")}
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
                      {tHome("sortOldestNewest")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Events */}
            <div className="flex flex-col gap-4">
              {paginatedPastEvents.length > 0 ? (
                paginatedPastEvents.map(event => (
                  <PastEventCard
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    startTime={event.start_time}
                    endTime={event.end_time}
                    location={event.location}
                    evaluationFormPath={event.evaluation_form}
                    description={event.description}
                    owner={event.organizer}
                    displayFirstRow={true}
                  />
                ))
              ) : (
                <p className="label-small-primary text-center text-neutral-600 my-6">
                  {tHome("noEvents")}
                </p>
              )}
            </div>
          </div>

          {/* Page Number Buttons */}
          <div className="flex justify-between items-center gap-2">
            {/* Left */}
            <button
              className="p-2 w-8 h-8 rounded-full bg-neutral-white border border-neutral-300 cursor-pointer"
              onClick={() => {
                if (currentPageNumber > 1)
                  setCurrentPageNumber(prev => prev - 1);
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
                    pages.push(
                      1,
                      "...",
                      currentPageNumber,
                      "...",
                      maxPageNumber
                    );
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
                if (currentPageNumber < maxPageNumber) {
                  setCurrentPageNumber(prev => prev + 1);
                }
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
              pageLoading ? "hidden" : "block"
            }`}
            onClick={() =>
              topRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <ArrowUpward
              sx={{ width: 24, height: 24 }}
              className="text-white"
            />
          </button>
        </div>
      </div>

      <div ref={bottomRef}></div>

      <Footer />

      {openLLEPopup && (
        <LLEPopup setOpenLLEPopup={setOpenLLEPopup} tohref={tohref} />
      )}
    </div>
  );
}
