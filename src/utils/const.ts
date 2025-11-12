import { EventInterface } from "./interface";

export const allEvents: EventInterface[] = [
  { id: "1", name: "Freshmen night" },
  { id: "2", name: "Drink Fresh" },
  { id: "3", name: "Movie Talks" },
  { id: "4", name: "Olivia Dean’s Listening Party" },
  { id: "5", name: "Freshmen Day" },
  { id: "6", name: "Eat Fresh" },
  { id: "7", name: "Movie Chat" },
  { id: "8", name: "Olivia Dean’s Reading Party" },
  { id: "9", name: "Senior Day" },
  { id: "10", name: "Breath Fresh" },
];

export const myCurrentEvents: EventInterface[] = allEvents.slice(0, 4);

export const myPastEvents: EventInterface[] = allEvents.slice(4, 8);

export const discoveryEvents: EventInterface[] = allEvents
  .slice(0, 4)
  .concat(allEvents.slice(8, 10));

export const eventDate = "3 สิงหาคม 2568";
export const eventTimeRange = "16:00 - 20:00 น.";
export const eventLocation = "สนามกีฬาจุฬาลงกรณ์มหาวิทยาลัย";
export const eventDescription =
  "กิจกรรมต้อนรับนิสิตใหม่ CU รุ่น 109 สู่รั้วมหาวิทยาลัย และ กระชับสัมพันธ์ อันดีระหว่างน้องใหม่คณะต่างๆภาย ในงานมีการจัด แสดงดนตรีโดยวงดนตรี อาทิเช่น Landokmai, Dept, Polycat, Tilly Birds, การแสดง พิเศษจาก CUDC และละครนิเทศ จุฬาฯ";
export const eventOwner = "องค์การบริหารสโมสรนิสิตจุฬาฯ (อบจ.)";
export const eventRole = "ผู้ดูแลกิจกรรม";

export const eventSchedules = [
  ["การแสดงพิเศษจาก CUDC", "16:00-16:30 น."],
  ["ละครนิเทศจุฬาฯ", "16:30-17:00 น."],
  ["POLYCAT", "17:00-18:00 น."],
  ["TILLY BIRDS", "18:00-19:00 น."],
  ["DEPT", "19:00-19:30 น."],
  ["LANDOKMAI", "19:30-20:00 น."],
];

export const displayButtonsFirstRowPastEvents = true;
export const maxPageNumber = 10;
export const defaultLLEPopupDescription =
  "บริการที่เลือกจะนำท่านไปสู่เว็บไซต์ของผู้ให้บริการที่อยู่ภายนอกแอปพลิเคชัน\nท่านยืนยันจะใช้บริการต่อหรือไม่";

export const scanTimeOutMs = 10000;

export const scannedName = "นายสมชาย ใจดี";
export const scannedID = "6501234567";
export const scannedFaculty = "วิศวกรรมศาสตร์";
