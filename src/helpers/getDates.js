import {
  getDaysInYear,
  getISOWeeksInYear,
  getDaysInMonth,
  getDay,
  getDate,
  getWeek,
  getWeekOfMonth,
  getMonth,
  getWeeksInMonth,
  getDayOfYear,
  getTime,
  isSunday,
  lastDayOfMonth,
} from "date-fns";

// Dates
export const currentDate = new Date();

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const currentYear = currentDate.getFullYear();
export const currentYearTimestamp = Math.floor(
  getTime(new Date(currentYear, 0, 0)) / 1000
);

// Year
export const daysInYear = getDaysInYear(currentDate);
export const weeksInYear = getISOWeeksInYear(currentDate);
export const monthsInYear = months.length;
export const dayOfYear = getDayOfYear(currentDate) - 1;
export const weekOfYear = getWeek(currentDate, { weekStartsOn: 1 });
export const monthOfYear = getMonth(currentDate);

// Week
export const daysInWeek = 7;
export const dayOfWeek = isSunday(currentDate) ? 6 : getDay(currentDate) - 1;

// Month
export const daysInMonth = getDaysInMonth(currentDate);
export const weeksInMonth = getWeeksInMonth(currentDate, { weekStartsOn: 1 });
export const dayOfMonth = getDate(currentDate) - 1;
export const weekOfMonth = getWeekOfMonth(currentDate, { weekStartsOn: 1 });
export const lastMonthDay = lastDayOfMonth(currentDate);
