"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ExpandMore,
  FlipCameraIos,
  Home,
  Link,
  Person,
} from "@mui/icons-material";
import { ZXingScanner } from "@/utils/scanner";
import QuickAttendButton from "@/components/QuickAttendButton";
import ErrorPopup from "@/components/popup/ErrorPopup";
import SuccessScanPopup from "@/components/popup/SuccessScanPopup";
import RegisteredScanPopup from "@/components/popup/RegisteredScanPopup";
import FailScanPopup from "@/components/popup/FailScanPopup";
import { useLocale, useTranslations } from "next-intl";
import { usePageLoading } from "@/context/PageLoadingContext";
import { Event, getEventById, getEvents } from "@/service/event";
import { useUser } from "@/providers/UserProvider";
import {
  getParticipantInformationQRCode,
  updateParticipantCommentQRCode,
  UserInformationQRCode,
} from "@/service/participant";

const ScanPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();

  // Refs
  const scanLockRef = useRef(false);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScannedTextRef = useRef<string | null>(null);
  const onScanRef = useRef<(text: string) => void>(() => {});

  const { userToken } = useUser();
  const { showPageLoading, hidePageLoading, pageLoading } = usePageLoading();

  // States
  const [event, setEvent] = useState<Event | null>(null);
  const [result, setResult] = useState<"success" | "duplicate" | "fail" | null>(
    null
  );
  const [showScanResultPopup, setShowResultScanPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);
  const [scanErrorMessageKey, setScanErrorMessageKey] = useState<
    "invalidQR" | "systemError"
  >("invalidQR");
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [isToggleEvents, setToggleEvents] = useState(false);
  const [myOtherFiveEvents, setMyOtherFiveEvents] = useState<Event[] | null>(
    null
  );
  const [scannedUser, setScannedUser] = useState<UserInformationQRCode>();
  const [isPaused, setIsPaused] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(-1);

  const activeDeviceId =
    selectedDeviceIndex >= 0
      ? devices[selectedDeviceIndex]?.deviceId
      : undefined;

  const handleSwitchCamera = () => {
    if (devices.length < 2) return;
    setSelectedDeviceIndex(
      prev => ((prev < 0 ? 0 : prev) + 1) % devices.length
    );
  };

  const tScan = useTranslations("scan");
  const tEvent = useTranslations("event");

  useEffect(() => {
    async function fetchEvent() {
      if (!userToken || !id) return;

      try {
        const thisEvent = await getEventById(userToken, id as string);
        setEvent(thisEvent);
      } catch (err) {
        console.error(err);
        setEvent(null);
      }
    }

    const fetchMyEvents = async () => {
      try {
        const { events } = await getEvents(userToken, true);
        const now = new Date();
        const current = events.filter(e => new Date(e.end_time) >= now);
        setMyOtherFiveEvents(
          current.filter(e => e.id != (id as string)).slice(0, 5)
        );
      } catch (err) {
        console.error("Fetch my events failed:", err);
        setMyOtherFiveEvents([]);
      }
    };

    showPageLoading();
    fetchEvent();
    fetchMyEvents();
    hidePageLoading();
  }, [id, userToken]);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  const showMessage = (msg: string) => {
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    setShowMessagePopup(false);
    setTimeout(() => {
      setMessage(msg);
      setShowMessagePopup(true);
      messageTimeoutRef.current = setTimeout(() => {
        setShowMessagePopup(false);
      }, 2500);
    }, 50);
  };

  const getCurrentLocation = () =>
    new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position =>
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        error => reject(error)
      );
    });

  const handleScanQrCode = async (code: string) => {
    if (scanLockRef.current || !code) return;
    scanLockRef.current = true;

    showPageLoading();
    setIsPaused(true);

    try {
      const currentLocation = await getCurrentLocation();

      const response = await getParticipantInformationQRCode(
        code,
        userToken,
        id as string,
        currentLocation.lat,
        currentLocation.lng
      );

      if (response.status === 200) {
        setResult(response.data.status);
        setScannedUser(response.data);
        setOneTimeCode(response.data.code);
        setShowResultScanPopup(true);
      } else if (response.status === 401) {
        setResult("fail");
        setShowResultScanPopup(true);
      } else {
        setScanErrorMessageKey("invalidQR");
        setShowTimeoutPopup(true);
        resetScanner();
      }
    } catch (err) {
      console.error("Scan failed:", err);
      setScanErrorMessageKey("systemError");
      setShowTimeoutPopup(true);
      resetScanner();
    } finally {
      hidePageLoading();
    }
  };

  const resetScanner = () => {
    setTimeout(() => {
      scanLockRef.current = false;
      lastScannedTextRef.current = null;
      setIsPaused(false);
    }, 300);
  };

  onScanRef.current = handleScanQrCode;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPaused) return;

    let cancelled = false;
    const scanner = new ZXingScanner();
    scanner
      .start({
        videoElement: video,
        deviceId: activeDeviceId,
        delayBetweenScanSuccess: 1000,
        onDecode: ({ text }) => {
          if (lastScannedTextRef.current === text) return;
          lastScannedTextRef.current = text;
          onScanRef.current(text);
        },
        onError: () => console.error("Scanner error"),
      })
      .then(() => {
        if (activeDeviceId !== undefined || cancelled) return;
        return ZXingScanner.listVideoInputDevices().then(list => {
          if (!cancelled) setDevices(list);
        });
      })
      .catch(() => {
        if (!cancelled) setDevices([]);
      });

    return () => {
      cancelled = true;
      scanner.stop();
    };
  }, [activeDeviceId, isPaused]);

  const handleUpdateComment = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    showPageLoading();
    e.preventDefault();
    e.stopPropagation();

    if (result !== "fail") {
      try {
        await updateParticipantCommentQRCode(oneTimeCode, userToken, note);
      } catch (err) {
        console.error("Update comment failed:", err);
      }
    }

    setNote("");
    setOneTimeCode("");
    hidePageLoading();
    setShowResultScanPopup(false);
    resetScanner();
  };

  return (
    <>
      <div className="w-full min-w-60 h-screen overflow-auto relative flex flex-col px-8 pt-8 pb-12 bg-white">
        {/* Main */}
        <div className="relative w-full h-full bg-transparent rounded-2xl mb-8 flex items-start justify-center">
          {/* Scanner */}
          <div className="absolute top-1/3 -translate-y-1/3 max-h-80 max-w-80 h-80 w-80 rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />

            {/* Custom Corner Borders */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            </div>
          </div>

          {/* Buttons */}
          <div className="absolute w-full flex justify-between gap-2 bottom-4 px-4 flex-wrap">
            <div className="flex gap-2">
              {/* Home */}
              <div className="w-fit h-fit">
                <QuickAttendButton
                  variant="outline"
                  type="icon"
                  disabled={pageLoading}
                  onClick={() => {
                    showPageLoading();
                    router.push(`/${locale}`);
                  }}
                  className="w-full h-full rounded-full border-2 border-primary bg-neutral-white"
                >
                  <Home className="w-6 h-6" />
                </QuickAttendButton>
              </div>

              {/* Link */}
              <div className="w-fit h-fit">
                <QuickAttendButton
                  variant="outline"
                  type="icon"
                  disabled={pageLoading}
                  onClick={() => {
                    const path = `${process.env.NEXT_PUBLIC_BACKOFFICE_PATH}/events/${id}`;
                    navigator.clipboard.writeText(path);
                    showMessage(tScan("copySuccess"));
                  }}
                  className="w-full h-full rounded-full border-2 border-primary bg-neutral-white"
                >
                  <Link className="w-6 h-6" />
                </QuickAttendButton>
              </div>
            </div>

            {/* Switch Camera */}
            {devices.length > 1 && (
              <div className="w-fit h-fit">
                <QuickAttendButton
                  variant="outline"
                  type="icon"
                  disabled={pageLoading}
                  onClick={handleSwitchCamera}
                  className="w-full h-full rounded-full border-2 border-primary bg-neutral-white"
                >
                  <FlipCameraIos className="w-6 h-6" />
                </QuickAttendButton>
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="w-full px-6 flex flex-col justify-center items-center gap-1 z-10 flex-wrap">
          <div className="relative flex gap-2 items-center">
            <p className="title-large-emphasized translate-y-1 truncate max-w-36">
              {event?.name || tEvent("notFoundTitle")}
            </p>
            {myOtherFiveEvents && myOtherFiveEvents.length > 0 && (
              <ExpandMore
                sx={{ width: 24, height: 24 }}
                className={`cursor-pointer text-primary transition-transform duration-300 ${isToggleEvents ? "rotate-180" : ""}`}
                onClick={() => setToggleEvents(prev => !prev)}
              />
            )}
            {/* My Event Dropdown */}
            {isToggleEvents &&
              myOtherFiveEvents &&
              myOtherFiveEvents.length > 0 && (
                <div className="w-30 absolute bottom-full mb-1 right-0 bg-neutral-white rounded-lg shadow-elevation-1 p-2 z-10 max-h-[90px] overflow-y-auto">
                  {myOtherFiveEvents.map(event => (
                    <button
                      disabled={pageLoading}
                      key={event.id}
                      className="text-ellipsis cursor-pointer block w-full body-small-primary text-left py-1 text-neutral-600 hover:bg-neutral-300 truncate overflow-hidden whitespace-nowrap"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        setToggleEvents(false);
                        showPageLoading();
                        router.push(`/scan/${event.id}`);
                      }}
                    >
                      {event.name}
                    </button>
                  ))}
                </div>
              )}
          </div>

          <div className="relative flex gap-2 items-center justify-center overflow-hidden">
            <Person sx={{ width: 24, height: 24 }} className="text-primary" />
            <p className="label-large-emphasized translate-y-1 truncate line-clamp-1">
              {event?.organizer || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* POPUPS */}
      {showTimeoutPopup && (
        <ErrorPopup
          errorMessage={tScan(scanErrorMessageKey)}
          onNext={e => {
            e.preventDefault();
            e.stopPropagation();
            setShowTimeoutPopup(false);
            resetScanner();
          }}
        />
      )}

      {showScanResultPopup &&
        (result === "success" && scannedUser ? (
          <SuccessScanPopup
            scannedUser={scannedUser}
            note={note}
            setNote={setNote}
            handleSubmit={handleUpdateComment}
          />
        ) : result === "duplicate" && scannedUser ? (
          <RegisteredScanPopup
            scannedUser={scannedUser}
            note={note}
            setNote={setNote}
            handleSubmit={handleUpdateComment}
          />
        ) : result === "fail" ? (
          <FailScanPopup
            note={note}
            setNote={setNote}
            handleSubmit={handleUpdateComment}
          />
        ) : null)}

      {showMessagePopup && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full shadow-lg animate-fade-in-out text-center z-50">
          <p className="label-large-primary translate-y-1">{message}</p>
        </div>
      )}
    </>
  );
};

export default ScanPage;
