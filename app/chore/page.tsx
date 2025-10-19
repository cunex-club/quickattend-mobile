import QuickAttendIcon from "../components/QuickAttendIcon";

export default function ChoreTest() {
  const typoClasses = [
    "display-large-primary",
    "display-large-emphasized",
    "display-medium-primary",
    "display-medium-emphasized",
    "display-small-primary",
    "display-small-emphasized",

    "headline-large-primary",
    "headline-large-emphasized",
    "headline-medium-primary",
    "headline-medium-emphasized",
    "headline-small-primary",
    "headline-small-emphasized",

    "title-large-primary",
    "title-large-emphasized",
    "title-medium-primary",
    "title-medium-emphasized",
    "title-small-primary",
    "title-small-emphasized",

    "label-large-primary",
    "label-large-emphasized",
    "label-medium-primary",
    "label-medium-emphasized",
    "label-small-primary",
    "label-small-emphasized",

    "body-large-primary",
    "body-large-emphasized",
    "body-medium-primary",
    "body-medium-emphasized",
    "body-small-primary",
    "body-small-emphasized",
  ];

  const formatClassName = (className: string) => {
    return className
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Color Preview</h1>
      <h2 className="text-xl font-semibold mb-4">Text</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          "text-primary",
          "text-secondary",
          "text-success",
          "text-error",
          "text-warning",
          "text-neutral-black",
          "text-neutral-600",
          "text-neutral-500",
          "text-neutral-400",
          "text-neutral-300",
          "text-neutral-200",
          "text-neutral-100",
          "text-neutral-white",
          "text-chart-pink-100",
          "text-chart-pink-200",
          "text-chart-pink-300",
          "text-chart-pink-400",
          "text-chart-pink-500",
          "text-chart-neutral-100",
          "text-chart-neutral-200",
          "text-chart-neutral-300",
          "text-chart-neutral-400",
          "text-chart-neutral-500",
          "text-chart-neutral-600",
          "text-chart-neutral-white",
        ].map((textColor) => (
          <div
            key={textColor}
            className="rounded-xl h-20 border flex items-center justify-center text-sm font-medium"
          >
            <p className={textColor}>{textColor}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Border</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          "border-primary",
          "border-secondary",
          "border-success",
          "border-error",
          "border-warning",
          "border-neutral-black",
          "border-neutral-600",
          "border-neutral-500",
          "border-neutral-400",
          "border-neutral-300",
          "border-neutral-200",
          "border-neutral-100",
          "border-neutral-white",
          "border-chart-pink-100",
          "border-chart-pink-200",
          "border-chart-pink-300",
          "border-chart-pink-400",
          "border-chart-pink-500",
          "border-chart-neutral-100",
          "border-chart-neutral-200",
          "border-chart-neutral-300",
          "border-chart-neutral-400",
          "border-chart-neutral-500",
          "border-chart-neutral-600",
          "border-chart-neutral-white",
        ].map((borderColor) => (
          <div
            key={borderColor}
            className={`rounded-xl h-20 border ${borderColor} flex items-center justify-center text-sm font-medium`}
          >
            <p className="text-black">{borderColor}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Background</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          "bg-primary",
          "bg-secondary",
          "bg-success",
          "bg-error",
          "bg-warning",
          "bg-neutral-black",
          "bg-neutral-600",
          "bg-neutral-500",
          "bg-neutral-400",
          "bg-neutral-300",
          "bg-neutral-200",
          "bg-neutral-100",
          "bg-neutral-white",
          "bg-chart-pink-100",
          "bg-chart-pink-200",
          "bg-chart-pink-300",
          "bg-chart-pink-400",
          "bg-chart-pink-500",
          "bg-chart-neutral-100",
          "bg-chart-neutral-200",
          "bg-chart-neutral-300",
          "bg-chart-neutral-400",
          "bg-chart-neutral-500",
          "bg-chart-neutral-600",
          "bg-chart-neutral-white",
        ].map((backgroundColor) => (
          <div
            key={backgroundColor}
            className={`rounded-xl h-20 border flex items-center justify-center text-sm font-medium ${backgroundColor}`}
          >
            <p className="text-black">{backgroundColor}</p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-6">Typography Preview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {typoClasses.map((typo) => (
          <div
            key={typo}
            className="p-4 border border-neutral-300 rounded-2xl bg-white shadow-sm"
          >
            <p className={typo}>{formatClassName(typo)}</p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-6">Icon Preview</h1>
      <div className="flex gap-2 flex-wrap mb-6">
        <QuickAttendIcon iconName="accessibility" type="outline" />
        <QuickAttendIcon iconName="accessibility" type="filled" />
      </div>

      <h1 className="text-3xl font-bold mb-6">Elevation Preview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`rounded-xl bg-white p-6 flex items-center justify-center shadow-elevation-${level}`}
            style={{ minHeight: "100px" }}
          >
            <p className="font-medium">Elevation {level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
