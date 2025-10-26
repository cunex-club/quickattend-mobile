"use client";

import { eventName } from "@/mock/event";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ArrowUpward,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";

function DiscoveryEventDetail() {
  const { id } = useParams();
  const [isInvisibleScrollToTop, setInvisibleScrollToTop] = useState(false);

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
      <div className="flex gap-1 mb-6 items-center">
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
          <p className="body-small-primary text-neutral-500">{eventName}</p>
        </Link>
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
