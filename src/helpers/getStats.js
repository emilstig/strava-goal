import {
  dayOfYear,
  dayOfWeek,
  dayOfMonth,
  totalDaysOfYear,
  totalDaysOfMonth,
  currentWeek,
  currentMonth
} from "./getDates";

const getStats = (
  goalDistance,
  statsYear,
  activitiesCurrentMonth,
  activitiesCurrentWeek,
  dataType = "current"
) => {
  // Goal distance
  const dayDistanceGoal = goalDistance / totalDaysOfYear;

  // Year distance
  const yearDistancePace =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  const yearDistanceRemaining = goalDistance - yearDistancePace;
  const yearDaysLeft = totalDaysOfYear - dayOfYear;
  const yearDistanceTarget = dayDistanceGoal * (dayOfYear + 1);
  const yearDistanceTargetDifference = yearDistancePace - yearDistanceTarget;
  const yearDistanceGoal = goalDistance;
  const yearDistanceGoalDifference = yearDistancePace - goalDistance;

  const dayDistanceCurrentGoal =
    (goalDistance - yearDistancePace) / (totalDaysOfYear - dayOfYear);

  // Month — Pace
  const monthCurrentPace = activitiesCurrentMonth
    ? activitiesCurrentMonth.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const monthAveragePace = yearDistancePace / (currentMonth + 1);
  const monthDistancePace =
    dataType === "current" ? monthCurrentPace : monthAveragePace;
  // Month — Target
  const monthCurrentTarget = dayDistanceCurrentGoal * (dayOfMonth + 1);
  const monthAverageTarget = dayDistanceGoal * (dayOfMonth + 1);
  const monthDistanceTarget =
    dataType === "current" ? monthCurrentTarget : monthAverageTarget;
  // Month — Target Difference
  const monthDistanceTargetDifference = monthDistancePace - monthDistanceTarget;
  // Month — Goal
  const monthCurrentGoal = dayDistanceCurrentGoal * totalDaysOfMonth;
  const monthAverageGoal = dayDistanceGoal * totalDaysOfMonth;
  const monthDistanceGoal =
    dataType === "current" ? monthCurrentGoal : monthAverageGoal;
  // Month — Goal Difference
  const monthDistanceGoalDifference = monthDistancePace - monthDistanceGoal;
  // Month — Days left
  const monthDaysLeft = totalDaysOfMonth - dayOfMonth;
  // const monthDistanceRemaining =
  //   dayDistanceCurrentGoal * totalDaysOfMonth - monthDistancePace;

  const month = {
    distancePace: monthDistancePace,
    daysRemaining: monthDaysLeft,
    distanceTarget: monthDistanceTarget,
    distanceTargetDifference: monthDistanceTargetDifference,
    distanceGoal: monthDistanceGoal,
    distanceGoalDifference: monthDistanceGoalDifference
  };

  // Week — Pace
  const weekCurrentPace = activitiesCurrentWeek
    ? activitiesCurrentWeek.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const weekAveragePace = yearDistancePace / currentWeek;
  const weekDistancePace =
    dataType === "current" ? weekCurrentPace : weekAveragePace;
  // Week — Target
  const weekCurrentTarget = dayDistanceCurrentGoal * (dayOfWeek + 1);
  const weekAverageTarget = dayDistanceGoal * (dayOfWeek + 1);
  const weekDistanceTarget =
    dataType === "current" ? weekCurrentTarget : weekAverageTarget;
  // Week — Target Difference
  const weekDistanceTargetDifference = weekDistancePace - weekDistanceTarget;
  // Week — Goal
  const weekCurrentGoal = dayDistanceCurrentGoal * 7;
  const weekAverageGoal = dayDistanceGoal * 7;
  const weekDistanceGoal =
    dataType === "current" ? weekCurrentGoal : weekAverageGoal;
  // Week — Goal Difference
  const weekDistanceGoalDifference = weekDistancePace - weekDistanceGoal;
  // Week — Days left
  const weekDaysLeft = 7 - dayOfWeek;
  //   const weekDistanceLeft = dayDistanceCurrentGoal * 7 - weekDistancePace;

  const week = {
    distancePace: weekDistancePace,
    daysLeft: weekDaysLeft,
    distanceTarget: weekDistanceTarget,
    distanceTargetDifference: weekDistanceTargetDifference,
    distanceGoal: weekDistanceGoal,
    distanceGoalDifference: weekDistanceGoalDifference
  };

  // Progress
  const yearPercentageGoal = (yearDistanceTarget / goalDistance) * 100;
  const yearPercentageCurrent = (yearDistancePace / goalDistance) * 100;

  return {
    // Year
    yearDistancePace,
    yearDistanceRemaining,
    yearDaysLeft,
    yearDistanceTarget,
    yearDistanceTargetDifference,
    yearDistanceGoal,
    yearDistanceGoalDifference,

    month,
    week,

    yearPercentageGoal,
    yearPercentageCurrent
  };
};

export default getStats;
