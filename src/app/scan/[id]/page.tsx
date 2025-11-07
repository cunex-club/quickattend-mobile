"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { Bolt, Link, Person } from "@mui/icons-material";
import { eventName, scanTimeOutMs } from "@/utils/const";
import QuickAttendButton from "@/components/QuickAttendButton";
import ErrorPopup from "@/components/ErrorPopup";

const ScanPage = () => {
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleTimeout, scanTimeOutMs);
  };

  const handleScanned = (code: string) => {
    if (scanner) scanner.stop().catch(() => {});
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    alert(`code=${encodeURIComponent(code)}`);
  };

  const handleTimeout = () => {
    setShowTimeoutPopup(true);
  };

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (!mounted) return;

        setStream(mediaStream);

        if (qrRef.current) {
          const html5Qr = new Html5Qrcode(qrRef.current.id, false);
          setScanner(html5Qr);

          timeoutRef.current = setTimeout(handleTimeout, scanTimeOutMs);

          await html5Qr.start(
            { facingMode: "environment" },
            {
              fps: 20,
              qrbox: 200,
            },
            decodedText => {
              if (mounted) handleScanned(decodedText);
            },
            errorMessage => {
              // console.log("scan error", errorMessage);
            }
          );
        }
      } catch (err: any) {}
    };

    startCamera();

    return () => {
      mounted = false;
      if (scanner) scanner.stop().catch(() => {});
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleFlash = async () => {
    if (!stream) return;
    try {
      const track = stream.getVideoTracks()[0];
      const capabilities = (track.getCapabilities?.() as any) || {};
      if (!capabilities.torch) return alert("อุปกรณ์นี้ไม่รองรับไฟฉาย");

      await track.applyConstraints({
        advanced: [{ torch: !isFlashOn } as any],
      });
      setIsFlashOn(!isFlashOn);
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถเปิด/ปิดไฟฉายได้");
    }
  };

  return (
    <>
      <div className="w-full h-screen overflow-auto relative flex flex-col px-8 pt-8 pb-12 bg-neutral-500">
        {/* Event Name */}
        <div
          className="max-w-full min-h-9 bg-neutral-white cursor-pointer rounded-full px-4 py-2 flex justify-between items-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(eventName);
          }}
        >
          <p className="title-small-primary translate-y-1">{eventName}</p>
          <Link className="w-4 h-4 text-primary" />
        </div>

        {/* Scanner */}
        <div className="flex-1 flex items-center justify-center -translate-y-8">
          <div className="relative w-[200px] h-[200px] overflow-hidden rounded-2xl border-primary">
            {/* Camera */}
            <div
              ref={qrRef}
              id="qr-reader"
              className="absolute inset-0 w-full h-full"
            />

            {/* Border */}
            <div className="absolute inset-0 pointer-events-none border-none z-10">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="w-full h-10 absolute bottom-6 left-0 right-0 px-6 flex justify-between gap-4 items-center z-10 flex-wrap">
          <div className="w-full max-w-[100px] h-full bg-neutral-white rounded-full px-4 py-2 flex justify-center items-center gap-2">
            <Person className="w-6 h-6 text-primary" />
            <p className="label-large-primary text-black translate-y-1">
              Staff
            </p>
          </div>

          <QuickAttendButton
            variant="outline"
            type="icon"
            onClick={toggleFlash}
            className="w-full max-w-10 h-full rounded-full border-none"
          >
            <Bolt className="w-6 h-6" />
          </QuickAttendButton>
        </div>

        <style jsx global>{`
          @keyframes scanline {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(200px);
            }
          }

          #qr-reader video {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
        `}</style>
      </div>

      {showTimeoutPopup && (
        <ErrorPopup
          name={"timeout"}
          errorMessage={`ข้อมูล QR ไม่ถูกต้อง<br/>กรุณาตรวจสอบและลองใหม่อีกครั้ง`}
          onNext={e => {
            e.preventDefault();
            e.stopPropagation();
            setShowTimeoutPopup(false);
            startTimeout();
          }}
        />
      )}
    </>
  );
};

export default ScanPage;
