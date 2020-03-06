import {
  getDaysInYear,
  getISOWeeksInYear,
  getWeek,
  getDayOfYear
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
export const currentDay = getDayOfYear(currentDate);
export const currentWeek = getWeek(currentDate);
export const currentMonth = currentDate.getMonth();
export const totalDays = getDaysInYear(currentDate);
export const totalWeeks = getISOWeeksInYear(currentDate);
export const totalMonths = months.length;
