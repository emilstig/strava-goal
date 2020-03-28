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
  const yearDistancePace =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  const yearDistanceRemaining = goalDistance - yearDistancePace;
  const yearDaysRemaining = totalDaysOfYear - dayOfYear;
  const yearDistanceTarget = dayDistanceGoal * (dayOfYear + 1);
  const yearDistanceTargetDifference = yearDistancePace - yearDistanceTarget;
  const yearDistanceGoal = goalDistance;
  const yearDistanceGoalDifference = yearDistancePace - goalDistance;

  const dayDistanceCurrentGoal =
    (goalDistance - yearDistancePace) / (totalDaysOfYear - dayOfYear);

  // Month distance
  const monthDistancePace = activitiesCurrentMonth
    ? activitiesCurrentMonth.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const monthDistanceRemaining =
    dayDistanceCurrentGoal * totalDaysOfMonth - monthDistancePace;
  const monthDaysRemaining = totalDaysOfMonth - dayOfMonth;
  const monthDistanceTarget = dayDistanceCurrentGoal * (dayOfMonth + 1);
  const monthDistanceTargetDifference = monthDistancePace - monthDistanceTarget;
  const monthDistanceGoal = dayDistanceCurrentGoal * totalDaysOfMonth;
  const monthDistanceGoalDifference = monthDistancePace - monthDistanceGoal;

  // Week distance
  const weekDistancePace = activitiesCurrentWeek
    ? activitiesCurrentWeek.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const weekDistanceLeft = dayDistanceCurrentGoal * 7 - weekDistancePace;
  const weekDaysLeft = 7 - dayOfWeek;
  const weekDistanceTarget = dayDistanceCurrentGoal * (dayOfWeek + 1);
  const weekDistanceTargetDifference = weekDistancePace - weekDistanceTarget;
  const weekDistanceGoal = dayDistanceCurrentGoal * 7;
  const weekDistanceGoalDifference = weekDistancePace - weekDistanceGoal;

  // Progress
  const yearPercentageGoal = (yearDistanceTarget / goalDistance) * 100;
  const yearPercentageCurrent = (yearDistancePace / goalDistance) * 100;

  return {
    // Year
    yearDistancePace,
    yearDistanceRemaining,
    yearDaysRemaining,
    yearDistanceTarget,
    yearDistanceTargetDifference,
    yearDistanceGoal,
    yearDistanceGoalDifference,

    // Month
    monthDistancePace,
    monthDistanceRemaining,
    monthDaysRemaining,
    monthDistanceTarget,
    monthDistanceTargetDifference,
    monthDistanceGoal,
    monthDistanceGoalDifference,

    // Week
    weekDistancePace,
    weekDistanceLeft,
    weekDaysLeft,
    weekDistanceTarget,
    weekDistanceTargetDifference,
    weekDistanceGoal,
    weekDistanceGoalDifference,

    yearPercentageGoal,
    yearPercentageCurrent
  };
};

export default getStats;
