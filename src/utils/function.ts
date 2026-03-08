export function toTitleCaseExceptOf(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (word === "of") return "of";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formatDateToTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDateToLocaleDate(
  date: Date,
  locale: "th-TH" | "en-US"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatEventDateTime(
  startISO: string,
  endISO: string,
  locale: "th-TH" | "en-US"
) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  const isSameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const dateText = isSameDay
    ? formatDateToLocaleDate(start, locale)
    : `${formatDateToLocaleDate(start, locale)} – ${formatDateToLocaleDate(
        end,
        locale
      )}`;

  const startTime = formatDateToTime(start);
  const endTime = formatDateToTime(end);

  const timeSuffix = locale === "th-TH" ? " น." : "";

  const timeRange = `${startTime} - ${endTime}${timeSuffix}`;

  return {
    date: dateText,
    timeRange,
  };
}
