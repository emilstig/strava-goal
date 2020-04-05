import {
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
    const dayWidth = (Math.round(dayDistance) / weekGoal) * 100 + "%";
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

  // Month weeks
  let monthWeeks = [];
  for (let i = 1; i < weeksInMonth + 1; i++) {
    const weekWidth = (weeksInMonth / weeksInMonth) * 100 + "%";
    monthWeeks.push({
      title: {
        full: "Week " + i,
        truncated: "W" + i,
      },
      width: weekWidth,
      isActive: i === weekOfMonth,
      isPassed: i < weekOfMonth,
    });
  }

  // Month days
  let monthDays = [];
  for (let i = 1; i < daysInMonth + 1; i++) {
    const dayWidth = (daysInMonth / daysInMonth) * 100 + "%";
    monthDays.push({
      title: {
        full: i,
        truncated: i,
      },
      width: dayWidth,
      isActive: i === dayOfMonth + 1,
      isPassed: i < dayOfMonth + 1,
    });
  }

  const yearMonths = months.map((month, index) => {
    const monthDistance = (yearGoal / daysInYear) * daysInMonth;
    const monthWidth = (Math.round(monthDistance) / yearGoal) * 100 + "%";

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
