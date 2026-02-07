export const languageCode = ["th-th", "en-us"] as const;
export type LanguageCode = (typeof languageCode)[number];

export const languageLabel: Record<string, string> = {
  "th-th": "ภาษาไทย",
  "en-us": "English",
};

export const eventSchedules = [
  ["การแสดงพิเศษจาก CUDC", "16:00-16:30 น."],
  ["ละครนิเทศจุฬาฯ", "16:30-17:00 น."],
  ["POLYCAT", "17:00-18:00 น."],
  ["TILLY BIRDS", "18:00-19:00 น."],
  ["DEPT", "19:00-19:30 น."],
  ["LANDOKMAI", "19:30-20:00 น."],
];

export const scanTimeOutMs = 10000;

export const scannedName = "นายสมชาย ใจดี";
export const scannedID = "6501234567";
export const scannedFaculty = "วิศวกรรมศาสตร์";
