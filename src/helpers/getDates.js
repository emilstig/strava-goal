import {
  getDaysInYear,
  getDaysInMonth,
  getISOWeeksInYear,
  getDay,
  getDate,
  getWeek,
  getMonth,
  getDayOfYear,
  getTime
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
export const currentDay = getDayOfYear(currentDate) - 1;
export const dayOfWeek = getDay(currentDate) - 1;
export const dayOfMonth = getDate(currentDate) - 1;
export const currentWeek = getWeek(currentDate);
export const currentMonth = getMonth(currentDate);
export const totalDays = getDaysInYear(currentDate);
export const totalDaysCurrentMonth = getDaysInMonth(currentDate);

export const totalWeeks = getISOWeeksInYear(currentDate);
export const totalMonths = months.length;
