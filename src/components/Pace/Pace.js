import React from "react";

import { getTimeline } from "../../helpers/getTimeline";
import ProgressLinear from "../ProgressLinear/ProgressLinear";

const Pace = ({ stats }) => {
  const year = stats.year.current;
  const week = stats.week.current;
  const month = stats.month.current;

  const { weekDays, monthWeeks, monthDays, yearMonths } = getTimeline(
    week.distanceGoal,
    month.distanceGoal,
    year.distanceGoal
  );

  // Week
  const weekCurrent = (week.distancePace / week.distanceGoal) * 100;
  const weekTarget = (week.distanceTarget / week.distanceGoal) * 100;
  const progressWeek = {
    distance: week.distancePace,
    distanceGoal: week.distanceGoal,
    distanceTargetDifference: week.distanceTargetDifference,
    distanceGoalDifference: week.distanceGoalDifference,
    currentDistance: weekCurrent,
    targetDistance: weekTarget,
  };

  // Month
  const monthCurrent = (month.distancePace / month.distanceGoal) * 100;
  const monthTarget = (month.distanceTarget / month.distanceGoal) * 100;
  const progressMonth = {
    distance: month.distancePace,
    distanceGoal: month.distanceGoal,
    distanceTargetDifference: month.distanceTargetDifference,
    distanceGoalDifference: month.distanceGoalDifference,
    currentDistance: monthCurrent,
    targetDistance: monthTarget,
  };

  // Year
  const yearCurrent = (year.distancePace / year.distanceGoal) * 100;
  const yearTarget = (year.distanceTarget / year.distanceGoal) * 100;
  const progressYear = {
    distance: year.distancePace,
    distanceGoal: year.distanceGoal,
    distanceTargetDifference: year.distanceTargetDifference,
    distanceGoalDifference: year.distanceGoalDifference,
    currentDistance: yearCurrent,
    targetDistance: yearTarget,
  };

  return (
    <React.Fragment>
      <ProgressLinear
        title="This week"
        timeline={weekDays}
        progress={progressWeek}
      />
      <ProgressLinear
        title="This month"
        timeline={monthDays}
        timelineMobile={monthWeeks}
        progress={progressMonth}
      />
      <ProgressLinear
        title="This year"
        timeline={yearMonths}
        progress={progressYear}
      />
    </React.Fragment>
  );
};
export default Pace;
