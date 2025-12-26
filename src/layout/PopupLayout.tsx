function PopupLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-black/70"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div
        className={className}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PopupLayout;
