import {
  dayOfYear,
  dayOfWeek,
  dayOfMonth,
  daysInYear,
  daysInMonth,
  weekOfYear,
  monthOfYear,
} from "./getDates";

const getStats = (
  goal,
  statsYear,
  monthActivities,
  weekActivities,
  dataType = "current"
) => {
  // Goal distance
  const dayDistanceGoal = goal / daysInYear;

  // Year distance
  const yearDistancePace =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  const yearDaysLeft = daysInYear - dayOfYear;
  const yearDistanceTarget = dayDistanceGoal * (dayOfYear + 1);
  const yearDistanceTargetDifference = yearDistancePace - yearDistanceTarget;
  const yearDistanceGoal = goal;
  const yearDistanceGoalDifference = yearDistancePace - goal;
  // const yearDistanceRemaining = goal - yearDistancePace;

  const dayDistanceCurrentGoal =
    (goal - yearDistancePace) / (daysInYear - dayOfYear);

  const year = {
    distancePace: yearDistancePace,
    daysLeft: yearDaysLeft,
    distanceTarget: yearDistanceTarget,
    distanceTargetDifference: yearDistanceTargetDifference,
    distanceGoal: yearDistanceGoal,
    distanceGoalDifference: yearDistanceGoalDifference,
  };

  // Month — Pace
  const monthCurrentPace = monthActivities
    ? monthActivities.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const monthAveragePace = yearDistancePace / (monthOfYear + 1);
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
  const monthCurrentGoal = dayDistanceCurrentGoal * daysInMonth;
  const monthAverageGoal = dayDistanceGoal * daysInMonth;
  const monthDistanceGoal =
    dataType === "current" ? monthCurrentGoal : monthAverageGoal;
  // Month — Goal Difference
  const monthDistanceGoalDifference = monthDistancePace - monthDistanceGoal;
  // Month — Days left
  const monthDaysLeft = daysInMonth - dayOfMonth;
  // const monthDistanceRemaining =
  //   dayDistanceCurrentGoal * daysInMonth - monthDistancePace;

  const month = {
    distancePace: monthDistancePace,
    daysRemaining: monthDaysLeft,
    distanceTarget: monthDistanceTarget,
    distanceTargetDifference: monthDistanceTargetDifference,
    distanceGoal: monthDistanceGoal,
    distanceGoalDifference: monthDistanceGoalDifference,
  };

  // Week — Pace
  const weekCurrentPace = weekActivities
    ? weekActivities.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const weekAveragePace = yearDistancePace / weekOfYear;
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
    distanceGoalDifference: weekDistanceGoalDifference,
  };

  return {
    year,
    month,
    week,
  };
};

export default getStats;
