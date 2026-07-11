export const languageCode = ["th-th", "en-us"] as const;
export type LanguageCode = (typeof languageCode)[number];

export const languageLabel: Record<string, string> = {
  "th-th": "ภาษาไทย",
  "en-us": "English",
};

export const EVENTS_PER_PAGE = 5;
