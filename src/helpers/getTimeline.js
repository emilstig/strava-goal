import { getWeek } from "date-fns";
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
    const firstWeekOfMonth = getWeek(new Date(currentYear, monthOfYear, 1), {
      weekStartsOn: 1,
    });
    return {
      number: index === 0 ? firstWeekOfMonth : firstWeekOfMonth + index,
      days: 0,
    };
  });

  for (let day = 1; day < daysInMonth + 1; day++) {
    const dayWidth = (daysInMonth / daysInMonth) * 100 + "%";
    const weekOfDay = getWeek(new Date(currentYear, monthOfYear, day), {
      weekStartsOn: 1,
    });
    const weekIndex = monthWeekDays.findIndex(
      (week) => week.number === weekOfDay
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
    console.log("getTimeline -> days", days);
    const weekWidth = (days / daysInMonth) * 100 + "%";
    console.log("getTimeline -> weekWidth", weekWidth);
    return {
      title: {
        full: "Week " + number,
        truncated: "W" + number,
      },
      width: weekWidth,
      isActive: index === weekOfMonth,
      isPassed: index < weekOfMonth,
    };
  });

  const yearMonths = months.map((month, index) => {
    const monthDistance = (yearGoal / daysInYear) * daysInMonth;
    const monthWidth = (monthDistance / yearGoal) * 100 + "%";

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
