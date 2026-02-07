export const languageCode = ["th-th", "en-us"] as const;
export type LanguageCode = (typeof languageCode)[number];

export const languageLabel: Record<string, string> = {
  "th-th": "ภาษาไทย",
  "en-us": "English",
};

export const scanTimeOutMs = 10000;

export const scannedName = "นายสมชาย ใจดี";
export const scannedID = "6501234567";
export const scannedFaculty = "วิศวกรรมศาสตร์";

export const EVENTS_PER_PAGE = 5;
