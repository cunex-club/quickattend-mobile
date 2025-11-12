"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import {
  Bolt,
  Business,
  CancelRounded,
  CheckCircle,
  ExpandMore,
  Home,
  Link,
  Person,
  ReplayCircleFilled,
  WatchLater,
} from "@mui/icons-material";
import {
  eventName,
  scannedName,
  scannedID,
  scanTimeOutMs,
  scannedFaculty,
  eventRole,
} from "@/utils/const";
import QuickAttendButton from "@/components/QuickAttendButton";
import ErrorPopup from "@/components/popup/ErrorPopup";
import PopupLayout from "@/layout/popup";
import { formatDateToTime } from "@/utils/function";

const ScanPage = () => {
  const { id } = useParams();
  const router = useRouter();

  // Refs
  const qrRef = useRef<HTMLDivElement>(null);
  const isScanningRef = useRef(false);
  const isResettingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // States
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [result, setResult] = useState<
    "success" | "registered" | "fail" | null
  >(null);
  const [showSuccessScanPopup, setShowSuccessScanPopup] = useState(false);
  const [showRegisteredScanPopup, setShowRegisteredScanPopup] = useState(false);
  const [showFailScanPopup, setShowFailScanPopup] = useState(false);
  const [timeStamp, setTimeStamp] = useState("");
  const [note, setNote] = useState("");
  const [isToggleRole, setToggleRole] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [scannerSize, setScannerSize] = useState(50);
  const [showCamera, setShowCamera] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);

  // Timeout logic
  const startTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleTimeout, scanTimeOutMs);
  };

  // Camera control logic
  const stopCamera = () => {
    if (scanner) {
      scanner.stop().catch(() => {});
      setScanner(null);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Handling the scanned QR code
  const handleScanned = (code: string) => {
    if (isResettingRef.current || isScanningRef.current) return;
    isScanningRef.current = true;
    setShowCamera(false);
    stopCamera();

    const now = new Date();
    setTimeStamp(formatDateToTime(now));
    setNote("");
    // TODO: Send Code to backend for validation

    // Demo purpose
    setResult("fail");
  };

  // Result/Popup control
  useEffect(() => {
    setShowSuccessScanPopup(result === "success");
    setShowRegisteredScanPopup(result === "registered");
    setShowFailScanPopup(result === "fail");
  }, [result]);

  // Scanner box size on window resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSize = () => {
      const width = window.innerWidth;
      setScannerSize(
        width <= 280
          ? 120
          : width <= 400
            ? 180
            : width <= 480 || width >= 640
              ? 240
              : width <= 600
                ? 300
                : 360
      );
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Timeout handler
  const handleTimeout = () => {
    setShowTimeoutPopup(true);
  };

  // Restart camera for rescanning
  const restartCamera = () => {
    stopCamera();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // ID validation placeholder
  useEffect(() => {
    // Todo: ID Validation
  }, [id]);

  // Initial camera setup and clean-up
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
            { fps: 2, qrbox: { width: scannerSize, height: scannerSize } },
            decodedText => {
              if (isResettingRef.current || isScanningRef.current) return;
              handleScanned(decodedText);
            },
            errorMessage => {}
          );
        }
      } catch (err: any) {}
    };
    startCamera();
    return () => {
      mounted = false;
      if (scanner) scanner.stop().catch(() => {});
      stopCamera();
    };
  }, [scannerSize]);

  // Toggle camera flash
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
      <div className="w-full min-w-60 h-screen overflow-auto relative flex flex-col px-8 pt-8 pb-12 bg-white">
        {/* Scanner */}
        <div className="relative w-full h-full bg-neutral-500 rounded-2xl mb-8">
          {showCamera && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center overflow-hidden rounded-2xl border-primary"
              style={{ width: scannerSize, height: scannerSize }}
            >
              {/* Camera */}
              <div
                ref={qrRef}
                id="qr-reader"
                className="absolute inset-0 w-full h-full"
              />

              {/* Border */}
              <div className="absolute inset-0 pointer-events-none border-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="absolute w-full flex justify-center gap-4 bottom-4 px-4 flex-wrap">
            <div className="w-fit h-fit">
              <QuickAttendButton
                variant="outline"
                type="icon"
                onClick={() => router.back()}
                className="w-full h-full rounded-full border-none"
              >
                <Home className="w-6 h-6" />
              </QuickAttendButton>
            </div>

            <div className="w-fit h-fit">
              <QuickAttendButton
                variant="outline"
                type="icon"
                onClick={() => {
                  navigator.clipboard.writeText(eventName);
                  setShowCopyPopup(true);
                  setTimeout(() => setShowCopyPopup(false), 2000);
                }}
                className="w-full h-full rounded-full border-none"
              >
                <Link className="w-6 h-6" />
              </QuickAttendButton>
            </div>

            <div className="w-fit h-fit">
              <QuickAttendButton
                variant="outline"
                type="icon"
                onClick={toggleFlash}
                className="w-full h-full rounded-full border-none"
              >
                <Bolt className="w-6 h-6" />
              </QuickAttendButton>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="w-full px-6 flex flex-col justify-center items-center gap-1 z-10 flex-wrap">
          <div className="flex gap-2 items-center">
            <p className="title-large-emphasized translate-y-1">{eventName}</p>
            <ExpandMore
              sx={{ width: 24, height: 24 }}
              className={`cursor-pointer text-primary transition-transform duration-300 ${isToggleRole ? "rotate-180" : ""}`}
              onClick={() => setToggleRole(prev => !prev)}
            />
          </div>

          <div
            className={`relative flex gap-2 items-center justify-center overflow-hidden ${isToggleRole ? "opacity-0" : "opacity-100"}`}
          >
            <Person sx={{ width: 24, height: 24 }} className="text-primary" />
            <p className="label-large-emphasized translate-y-1">{eventRole}</p>
          </div>
        </div>

        {/* Styles */}
        <style jsx global>{`
          #qr-reader video {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }

          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            10%,
            90% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-10px);
            }
          }

          .animate-fade-in-out {
            animation: fadeInOut 2s ease-in-out forwards;
          }
        `}</style>
      </div>

      {/* POPUPS */}
      {showTimeoutPopup && (
        <ErrorPopup
          errorMessage={`ข้อมูล QR ไม่ถูกต้อง<br/>กรุณาตรวจสอบและลองใหม่อีกครั้ง`}
          onNext={e => {
            e.preventDefault();
            e.stopPropagation();
            setShowTimeoutPopup(false);
            startTimeout();
          }}
        />
      )}

      {showSuccessScanPopup && (
        <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl">
          {/* Header */}
          <div className="w-full h-fit p-6 bg-success rounded-t-4xl flex justify-center items-center mb-6">
            <CheckCircle
              className="text-white"
              sx={{ width: 40, height: 40 }}
            />
            <p className="ml-2 headline-large-emphasized text-white translate-y-1.5">
              ลงทะเบียนสำเร็จ
            </p>
          </div>

          {/* Image */}
          <img
            src="/mock/scan_placeholder.png"
            alt="Scan Placeholder"
            className="mx-auto mb-4"
          />

          {/* Content */}
          <div className="flex flex-col px-4 py-6">
            {/* Information */}
            <div className="flex flex-col gap-2 mb-8">
              <p className="title-medium-emphasized">
                รายละเอียดผู้ลงทะเบียนเข้างาน
              </p>

              {/* Name */}
              <div className="flex gap-2">
                <Person
                  className="text-primary"
                  sx={{ width: 16, height: 16 }}
                />
                <div className="flex flex-col -translate-y-1">
                  <p className="body-medium-primary">{scannedName}</p>
                  <p className="body-medium-primary">
                    รหัสประจำตัว {scannedID}
                  </p>
                </div>
              </div>

              {/* Faculty */}
              <div className="flex gap-2">
                <Business
                  className="text-primary"
                  sx={{ width: 16, height: 16 }}
                />
                <p className="body-medium-primary -translate-y-1">
                  {scannedFaculty}
                </p>
              </div>

              {/* Time */}
              <div className="flex gap-2">
                <WatchLater
                  className="text-primary"
                  sx={{ width: 16, height: 16 }}
                />
                <p className="body-medium-primary -translate-y-1">
                  ลงทะเบียนสำเร็จ: {timeStamp} น.
                </p>
              </div>
            </div>

            {/* Note */}
            <form className="flex flex-col gap-2 mb-6">
              <p className="title-medium-emphasized">หมายเหตุ</p>
              <input
                className="w-full h-11 border border-neutral-400 focus:outline-none rounded-md px-3"
                value={note}
                placeholder="กรอกข้อมูลเพิ่มเติม (ถ้ามี)"
                onChange={e => setNote(e.target.value)}
              />
            </form>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <QuickAttendButton
                type="text"
                variant="filled"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCamera(true);
                  restartCamera();
                }}
              >
                <p className="translate-y-1">ตกลง</p>
              </QuickAttendButton>
            </div>
          </div>
        </PopupLayout>
      )}

      {showRegisteredScanPopup && (
        <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl">
          {/* Header */}
          <div className="w-full h-fit p-6 bg-warning rounded-t-4xl flex justify-center items-center mb-6">
            <ReplayCircleFilled
              className="text-white"
              sx={{ width: 40, height: 40 }}
            />
            <p className="ml-2 headline-large-emphasized text-white translate-y-1.5">
              ลงทะเบียนแล้ว
            </p>
          </div>

          {/* Image */}
          <img
            src="/mock/scan_placeholder.png"
            alt="Scan Placeholder"
            className="mx-auto mb-4"
          />

          {/* Content */}
          <div className="flex flex-col px-4 py-6">
            {/* Information */}
            <div className="flex flex-col gap-2 mb-8">
              <p className="title-medium-emphasized">
                รายละเอียดผู้ลงทะเบียนเข้างาน
              </p>

              {/* Name */}
              <div className="flex gap-2">
                <Person
                  className="text-primary"
                  sx={{ width: 16, height: 16 }}
                />
                <div className="flex flex-col -translate-y-1">
                  <p className="body-medium-primary">{scannedName}</p>
                  <p className="body-medium-primary">
                    รหัสประจำตัว {scannedID}
                  </p>
                </div>
              </div>

              {/* Faculty */}
              <div className="flex gap-2">
                <Business
                  className="text-primary"
                  sx={{ width: 16, height: 16 }}
                />
                <p className="body-medium-primary -translate-y-1">
                  {scannedFaculty}
                </p>
              </div>

              {/* Time */}
              <div className="flex gap-2">
                <WatchLater
                  className="text-primary"
                  sx={{ width: 16, height: 16 }}
                />
                <p className="body-medium-primary -translate-y-1">
                  ลงทะเบียนสำเร็จ: {timeStamp} น.
                </p>
              </div>
            </div>

            {/* Note */}
            <form className="flex flex-col gap-2 mb-6">
              <p className="title-medium-emphasized">หมายเหตุ</p>
              <input
                className="w-full h-11 border border-neutral-400 focus:outline-none rounded-md px-3"
                value={note}
                placeholder="กรอกข้อมูลเพิ่มเติม (ถ้ามี)"
                onChange={e => setNote(e.target.value)}
              />
            </form>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <QuickAttendButton
                type="text"
                variant="filled"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCamera(true);
                  restartCamera();
                }}
              >
                <p className="translate-y-1">ตกลง</p>
              </QuickAttendButton>
            </div>
          </div>
        </PopupLayout>
      )}

      {showFailScanPopup && (
        <PopupLayout className="relative bg-neutral-white w-[349px] rounded-4xl">
          {/* Header */}
          <div className="w-full h-fit p-6 bg-error rounded-t-4xl flex justify-center items-center mb-6">
            <CancelRounded
              className="text-white"
              sx={{ width: 40, height: 40 }}
            />
            <p className="ml-2 headline-large-emphasized text-white translate-y-1.5">
              ลงทะเบียนไม่สำเร็จ
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col px-4 pt-2 pb-6">
            {/* Information */}
            <div className="flex flex-col gap-2 mb-8">
              <p className="title-large-primary text-center">
                ไม่ได้อยู่ในรายชื่อผู้มีสิทธิ์ลงทะเบียนเข้าร่วมกิจกรรม
              </p>
            </div>

            {/* Note */}
            <form className="flex flex-col gap-2 mb-6">
              <p className="title-medium-emphasized">หมายเหตุ</p>
              <input
                className="w-full h-11 border border-neutral-400 focus:outline-none rounded-md px-3"
                value={note}
                placeholder="กรอกข้อมูลเพิ่มเติม (ถ้ามี)"
                onChange={e => setNote(e.target.value)}
              />
            </form>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <QuickAttendButton
                type="text"
                variant="filled"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCamera(true);
                  restartCamera();
                }}
              >
                <p className="translate-y-1">ตกลง</p>
              </QuickAttendButton>
            </div>
          </div>
        </PopupLayout>
      )}

      {showCopyPopup && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full shadow-lg animate-fade-in-out z-50">
          <p className="label-large-primary translate-y-1">คัดลอกสำเร็จแล้ว</p>
        </div>
      )}
    </>
  );
};

export default ScanPage;
