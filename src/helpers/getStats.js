import {
  format,
  parse,
  getWeek,
  getMonth,
  isAfter,
  subDays,
  subWeeks,
  subMonths,
  eachDayOfInterval,
  isSameDay,
  //   isSameMonth,
  startOfWeek,
  startOfMonth,
  //   endOfWeek,
} from "date-fns";

import {
  currentDate,
  dayOfYear,
  dayOfWeek,
  dayOfMonth,
  daysInYear,
  daysInMonth,
  weekOfYear,
  monthOfYear,
} from "./getDates";

const getStats = ({ goal, statsYear, yearActivities }) => {
  // YEAR
  // Pace
  const yearDistancePace =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  // DAY GOAL
  const dayAverageGoal = goal / daysInYear;
  const dayCurrentGoal = (goal - yearDistancePace) / (daysInYear - dayOfYear);
  // Target
  const yearDistanceTarget = dayAverageGoal * (dayOfYear + 1);
  // Target difference
  const yearDistanceTargetDifference = yearDistancePace - yearDistanceTarget;
  // Goal
  const yearDistanceGoal = goal;
  // Goal difference
  const yearDistanceGoalDifference = yearDistancePace - goal;
  // Days left
  const yearDaysLeft = daysInYear - dayOfYear;
  // Distance remaining
  // const yearDistanceRemaining = goal - yearDistancePace;

  const averageYear = {
    distancePace: yearDistancePace,
    distanceTarget: yearDistanceTarget,
    distanceTargetDifference: yearDistanceTargetDifference,
    distanceGoal: yearDistanceGoal,
    distanceGoalDifference: yearDistanceGoalDifference,
    daysLeft: yearDaysLeft,
  };

  // MONTH
  const currentMonthActivities =
    yearActivities && yearActivities.length > 0
      ? yearActivities.filter(
          (activity) => getMonth(new Date(activity.start_date)) === monthOfYear
        )
      : null;
  // Pace
  const monthCurrentPace = currentMonthActivities
    ? currentMonthActivities.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const monthAveragePace = yearDistancePace / (monthOfYear + 1);
  // Target
  const monthCurrentTarget = dayCurrentGoal * (dayOfMonth + 1);
  const monthAverageTarget = dayAverageGoal * (dayOfMonth + 1);
  // Target Difference
  const monthCurrentTargetDifference = monthCurrentPace - monthCurrentTarget;
  const monthAverageTargetDifference = monthAveragePace - monthAverageTarget;
  // Goal
  const monthCurrentGoal = dayCurrentGoal * daysInMonth;
  const monthAverageGoal = dayAverageGoal * daysInMonth;
  // Goal Difference
  const monthCurrentGoalDifference = monthCurrentPace - monthCurrentGoal;
  const monthAverageGoalDifference = monthAveragePace - monthAverageGoal;
  // Days left
  const monthDaysLeft = daysInMonth - dayOfMonth;
  // Distance remaining
  // const monthDistanceRemaining =
  //   dayCurrentGoal * daysInMonth - monthDistancePace;
  // Past months
  const pastMonthsActivities = yearActivities
    ? yearActivities.filter((activity) =>
        isAfter(
          new Date(activity.start_date),
          startOfMonth(subMonths(currentDate, 12))
        )
      )
    : null;
  let pastMonthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const pastMonths =
    pastMonthsActivities && pastMonthsActivities.length > 0
      ? pastMonthNumbers
          .map((month) => {
            return pastMonthsActivities.filter((activity) => {
              const activityMonth = getMonth(new Date(activity.start_date));
              return month === activityMonth;
            });
          })
          .map((activities, index) => {
            const totalDistance =
              activities && activities.length > 0
                ? activities.reduce(
                    (sum, currentActivity) =>
                      sum + currentActivity.distance / 1000,
                    0
                  )
                : 0;
            const monthNumber = pastMonthNumbers[index] + 1;
            const date = parse(`${monthNumber}`, "M", new Date());
            return {
              label: {
                full: format(new Date(date), "MMM"),
                truncated: format(new Date(date), "MMMMM"),
              },
              distance: totalDistance,
            };
          })
      : null;

  const currentMonth = {
    distancePace: monthCurrentPace,
    distanceTarget: monthCurrentTarget,
    distanceTargetDifference: monthCurrentTargetDifference,
    distanceGoal: monthCurrentGoal,
    distanceGoalDifference: monthCurrentGoalDifference,
    daysRemaining: monthDaysLeft,
  };
  const averageMonth = {
    distancePace: monthAveragePace,
    distanceTarget: monthAverageTarget,
    distanceTargetDifference: monthAverageTargetDifference,
    distanceGoal: monthAverageGoal,
    distanceGoalDifference: monthAverageGoalDifference,
    daysRemaining: monthDaysLeft,
  };

  // WEEK
  const currentWeekActivities = yearActivities
    ? yearActivities.filter(
        (activity) =>
          getWeek(new Date(activity.start_date), {
            weekStartsOn: 1,
          }) === weekOfYear
      )
    : null;
  // Pace
  const weekCurrentPace = currentWeekActivities
    ? currentWeekActivities.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const weekAveragePace = yearDistancePace / weekOfYear;
  // Target
  const weekCurrentTarget = dayCurrentGoal * (dayOfWeek + 1);
  const weekAverageTarget = dayAverageGoal * (dayOfWeek + 1);
  // Target Difference
  const weekCurrentTargetDifference = weekCurrentPace - weekCurrentTarget;
  const weekAverageTargetDifference = weekAveragePace - weekAverageTarget;
  // Goal
  const weekCurrentGoal = dayCurrentGoal * 7;
  const weekAverageGoal = dayAverageGoal * 7;
  // Goal Difference
  const weekCurrentGoalDifference = weekCurrentPace - weekCurrentGoal;
  const weekAverageGoalDifference = weekAveragePace - weekAverageGoal;
  // Days left
  const weekDaysLeft = 7 - dayOfWeek;
  // Distance remaining
  //   const weekDistanceLeft = dayCurrentGoal * 7 - weekDistancePace;

  // Past weeks
  const pastWeeksActivities =
    yearActivities && yearActivities.length > 0
      ? yearActivities.filter((activity) =>
          isAfter(
            new Date(activity.start_date),
            startOfWeek(subWeeks(currentDate, 12), { weekStartsOn: 1 })
          )
        )
      : null;
  let pastWeekNumbers = [];
  // Get last 12 week numbers
  eachDayOfInterval({
    start: startOfWeek(subWeeks(currentDate, 11), { weekStartsOn: 1 }),
    end: new Date(currentDate),
  }).forEach((day) => {
    const week = getWeek(new Date(day), {
      weekStartsOn: 1,
    });
    if (!pastWeekNumbers.includes(week)) {
      pastWeekNumbers.push(week);
    }
  });

  const pastWeeks =
    pastWeeksActivities && pastWeeksActivities.length > 0
      ? pastWeekNumbers
          .map((week) => {
            return pastWeeksActivities.filter((activity) => {
              const activityWeek = getWeek(new Date(activity.start_date), {
                weekStartsOn: 1,
              });
              return week === activityWeek;
            });
          })
          .map((activities, index) => {
            const totalDistance =
              activities && activities.length > 0
                ? activities.reduce(
                    (sum, currentActivity) =>
                      sum + currentActivity.distance / 1000,
                    0
                  )
                : 0;
            const weekNumber = pastWeekNumbers[index];
            // const dateStart = parse(`${weekNumber}`, "w", new Date(), {
            //   weekStartsOn: 1,
            // });
            // const dateEnd = endOfWeek(new Date(dateStart), { weekStartsOn: 1 });
            // const weekDates = `${format(dateStart, "d")}${
            //   !isSameMonth(dateStart, dateEnd) ? format(dateStart, " MMM") : ``
            // } - ${format(dateEnd, "d MMM")}`;
            return {
              label: {
                // full: weekDates,
                full: `W${weekNumber}`,
                truncated: `${weekNumber}`,
              },
              distance: totalDistance,
            };
          })
      : null;

  const currentWeek = {
    distancePace: weekCurrentPace,
    distanceTarget: weekCurrentTarget,
    distanceTargetDifference: weekCurrentTargetDifference,
    distanceGoal: weekCurrentGoal,
    distanceGoalDifference: weekCurrentGoalDifference,
    daysLeft: weekDaysLeft,
  };
  const averageWeek = {
    distancePace: weekAveragePace,
    distanceTarget: weekAverageTarget,
    distanceTargetDifference: weekAverageTargetDifference,
    distanceGoal: weekAverageGoal,
    distanceGoalDifference: weekAverageGoalDifference,
    daysLeft: weekDaysLeft,
  };

  // DAY
  const averageDay = {
    distancePace: null,
    distanceTarget: null,
    distanceTargetDifference: null,
    distanceGoal: dayAverageGoal,
    distanceGoalDifference: null,
    daysLeft: null,
  };
  // Past days
  const pastDaysActivities =
    yearActivities && yearActivities.length > 0
      ? yearActivities.filter((activity) =>
          isAfter(new Date(activity.start_date), subDays(currentDate, 11))
        )
      : null;
  const pastDaysDates = eachDayOfInterval({
    start: subDays(currentDate, 11),
    end: new Date(currentDate),
  });
  const pastDays =
    pastDaysActivities && pastDaysActivities.length > 0
      ? pastDaysDates
          .map((day) => {
            return pastDaysActivities.filter((activity) => {
              return isSameDay(new Date(day), new Date(activity.start_date));
            });
          })
          .map((activities, index) => {
            const totalDistance =
              activities && activities.length > 0
                ? activities.reduce(
                    (sum, currentActivity) =>
                      sum + currentActivity.distance / 1000,
                    0
                  )
                : 0;
            return {
              label: {
                full: format(new Date(pastDaysDates[index]), "d MMM"),
                truncated: format(new Date(pastDaysDates[index]), "EEEEE"),
              },
              distance: totalDistance,
            };
          })
      : null;

  return {
    year: { current: averageYear, average: averageYear, past: null },
    month: { current: currentMonth, average: averageMonth, past: pastMonths },
    week: { current: currentWeek, average: averageWeek, past: pastWeeks },
    day: { current: null, average: averageDay, past: pastDays },
  };
};

export default getStats;
