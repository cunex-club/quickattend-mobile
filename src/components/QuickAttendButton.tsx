interface QuickAttendButtonProps {
  variant: "filled" | "outline";
  type?: "text" | "icon";
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}

export default function QuickAttendButton({
  variant,
  className = "",
  disabled = false,
  type = "text",
  onClick,
  children,
}: QuickAttendButtonProps) {
  const baseColor =
    variant === "filled"
      ? "bg-primary border-primary text-neutral-white"
      : "border-primary text-primary";

  const layout =
    type === "text"
      ? `min-h-[32px] min-w-fit max-w-full flex-1`
      : `min-h-[32px] w-full flex-1`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-1 rounded-2xl px-3 py-1 border cursor-pointer disabled:cursor-default label-large-primary ${baseColor} ${layout} ${className}`}
    >
      {children}
    </button>
  );
}
