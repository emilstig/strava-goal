import { getWeek, getDaysInMonth } from "date-fns";
import {
  currentYear,
  months,
  days,
  monthOfYear,
  dayOfWeek,
  dayOfMonth,
  daysInMonth,
  weeksInMonth,
  weekOfMonth,
  daysInYear,
} from "./getDates";

export const getTimeline = (weekGoal, monthGoal, yearGoal) => {
  // Weekdays
  const weekDays = days.map((day, index) => {
    const dayDistance = weekGoal / 7;
    const dayWidth = (dayDistance / weekGoal) * 100 + "%";

    return {
      title: {
        full: day.substring(0, 3),
        truncated: day.substring(0, 1),
      },
      width: dayWidth,
      isActive: index === dayOfWeek,
      isPassed: index < dayOfWeek,
    };
  });

  // Month days // Month week days
  let monthDays = [];

  let monthWeekDays = [...Array(weeksInMonth)].map((week, index) => {
    const weekNumber = getWeek(
      new Date(currentYear, monthOfYear, monthOfYear === 0 ? 4 : 1),
      {
        weekStartsOn: 1,
        firstWeekContainsDate: 4,
      }
    );

    return {
      number: weekNumber + index,
      days: 0,
    };
  });

  for (let day = 1; day < daysInMonth; day++) {
    const date = new Date(currentYear, monthOfYear, day);
    const dayWidth = (daysInMonth / daysInMonth) * 100 + "%";

    const weekFromDate = getWeek(date, {
      weekStartsOn: 1,
      firstWeekContainsDate: monthOfYear === 0 ? 1 : 4,
    });

    const weekIndex = monthWeekDays.findIndex(
      (week) => week.number === weekFromDate
    );

    monthWeekDays[weekIndex].days = monthWeekDays[weekIndex].days + 1;

    monthDays.push({
      title: {
        full: day,
        truncated: day,
      },
      width: dayWidth,
      isActive: day === dayOfMonth + 1,
      isPassed: day < dayOfMonth + 1,
    });
  }

  // Month weeks
  let monthWeeks = monthWeekDays.map((week, index) => {
    const { number, days } = week;
    const weekWidth = (days / daysInMonth) * 100 + "%";

    return {
      title: {
        full: "Week " + number,
        truncated: "W" + number,
      },
      width: weekWidth,
      isActive: index + 1 === weekOfMonth,
      isPassed: index + 1 < weekOfMonth,
    };
  });

  // Year
  const yearMonths = months.map((month, index) => {
    const monthDays = getDaysInMonth(new Date(currentYear, index));
    const monthWidth = (monthDays / daysInYear) * 100 + "%";

    return {
      title: {
        full: month.substring(0, 3),
        truncated: month.substring(0, 1),
      },
      width: monthWidth,
      isActive: index === monthOfYear,
      isPassed: index < monthOfYear,
    };
  });
  return {
    weekDays,
    monthDays,
    monthWeeks,
    yearMonths,
  };
};
