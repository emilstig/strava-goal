import {
  getDaysInYear,
  getDaysInMonth,
  getISOWeeksInYear,
  getDay,
  getDate,
  getWeek,
  getMonth,
  getDayOfYear,
  getTime,
  isSunday
} from "date-fns";

// Dates
const currentDate = new Date();

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
  "December"
];

export const currentYear = currentDate.getFullYear();
export const currentYearTimestamp = Math.floor(
  getTime(new Date(currentYear, 0, 0)) / 1000
);
export const dayOfYear = getDayOfYear(currentDate) - 1;
export const dayOfWeek = isSunday(currentDate) ? 6 : getDay(currentDate) - 1;
export const dayOfMonth = getDate(currentDate) - 1;
export const currentWeek = getWeek(currentDate, { weekStartsOn: 1 });
export const currentMonth = getMonth(currentDate);
export const totalDaysOfYear = getDaysInYear(currentDate);
export const totalDaysOfMonth = getDaysInMonth(currentDate);
export const totalDaysOfWeek = 7;
export const totalWeeksOfYear = getISOWeeksInYear(currentDate);
export const totalMonthsOfYear = months.length;
