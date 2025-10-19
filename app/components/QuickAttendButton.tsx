import { useState } from "react";
import LLEPopup from "./LLEPopup";

interface QuickAttendButtonProps {
  variant: "filled" | "outline";
  width: number;
  height?: number;
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}

export function HandleEventButton() {
  const [openLLEPopup, setOpenLLEPopup] = useState(false);
  return (
    <>
      <QuickAttendButton
        variant="filled"
        width={110}
        onClick={() => {
          setOpenLLEPopup(true);
        }}
      >
        <p className="translate-y-1">จัดการกิจกรรม</p>
      </QuickAttendButton>
      {openLLEPopup && <LLEPopup setOpenLLEPopup={setOpenLLEPopup} />}
    </>
  );
}

export default function QuickAttendButton({
  variant,
  className = "",
  width,
  height = 36,
  onClick,
  children,
}: QuickAttendButtonProps) {
  const twColor =
    variant === "filled"
      ? "bg-primary border-primary text-neutral-white"
      : "bg-neutral-white border-primary text-primary";

  return (
    <button
      onClick={onClick}
      style={{ width, height }}
      className={`flex items-center justify-center gap-1 cursor-pointer
        rounded-2xl p-1 border label-large-primary ${twColor} ${className}`}
    >
      {children}
    </button>
  );
}
