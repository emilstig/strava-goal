import {
  dayOfYear,
  dayOfWeek,
  dayOfMonth,
  totalDaysOfYear,
  totalDaysOfMonth
} from "./getDates";

const getStats = (
  goalDistance,
  statsYear,
  activitiesCurrentMonth,
  activitiesCurrentWeek
) => {
  // Goal distance
  const dayDistanceGoal = goalDistance / totalDaysOfYear;

  // Year distance
  const yearDistanceCurrent =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  const yearDistanceRemaining = goalDistance - yearDistanceCurrent;
  const yearDaysRemaining = totalDaysOfYear - dayOfYear;
  const yearDistanceExpected = dayDistanceGoal * (dayOfYear + 1);
  const yearDistanceExpectedDifference =
    yearDistanceCurrent - yearDistanceExpected;

  // Month distance
  const monthDistanceCurrent = activitiesCurrentMonth
    ? activitiesCurrentMonth.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const monthDistanceRemaining =
    dayDistanceGoal * totalDaysOfMonth - monthDistanceCurrent;
  const monthDaysRemaining = totalDaysOfMonth - dayOfMonth;
  const monthDistanceExpected = dayDistanceGoal * (dayOfMonth + 1);
  const monthDistanceExpectedDifference =
    monthDistanceCurrent - monthDistanceExpected;

  // Week distance
  const weekDistanceCurrent = activitiesCurrentWeek
    ? activitiesCurrentWeek.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const weekDistanceLeft = dayDistanceGoal * 7 - weekDistanceCurrent;
  const weekDaysLeft = 7 - dayOfWeek;
  const weekDistanceExpected = dayDistanceGoal * (dayOfWeek + 1);
  const weekDistanceExpectedDifference =
    weekDistanceCurrent - weekDistanceExpected;

  // Progress
  const yearPercentageGoal = (yearDistanceExpected / goalDistance) * 100;
  const yearPercentageCurrent = (yearDistanceCurrent / goalDistance) * 100;

  return {
    yearDistanceCurrent,
    yearDistanceRemaining,
    yearDaysRemaining,
    yearDistanceExpected,
    yearDistanceExpectedDifference,

    monthDistanceCurrent,
    monthDistanceRemaining,
    monthDaysRemaining,
    monthDistanceExpected,
    monthDistanceExpectedDifference,

    weekDistanceCurrent,
    weekDistanceLeft,
    weekDaysLeft,
    weekDistanceExpected,
    weekDistanceExpectedDifference,

    yearPercentageGoal,
    yearPercentageCurrent
  };
};

export default getStats;
