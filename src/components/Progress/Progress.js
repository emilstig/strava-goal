import React from "react";

import { getTimeline } from "../../helpers/getTimeline";
import ProgressLinear from "../ProgressLinear/ProgressLinear";
const Progress = ({ stats }) => {
  const { week, month, year } = stats;
  const { days, weeks, months } = getTimeline(
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
    currentDistance: weekCurrent,
    targetDistance: weekTarget,
  };

  // Month
  const monthCurrent = (month.distancePace / month.distanceGoal) * 100;
  const monthTarget = (month.distanceTarget / month.distanceGoal) * 100;
  const progressMonth = {
    distance: month.distancePace,
    distanceGoal: month.distanceGoal,
    currentDistance: monthCurrent,
    targetDistance: monthTarget,
  };

  // Year
  const yearCurrent = (year.distancePace / year.distanceGoal) * 100;
  const yearTarget = (year.distanceTarget / year.distanceGoal) * 100;
  const progressYear = {
    distance: year.distancePace,
    distanceGoal: year.distanceGoal,
    currentDistance: yearCurrent,
    targetDistance: yearTarget,
  };

  return (
    <React.Fragment>
      <ProgressLinear
        title="This week"
        timeline={days}
        progress={progressWeek}
      />
      <ProgressLinear
        title="This month"
        timeline={weeks}
        progress={progressMonth}
      />
      <ProgressLinear
        title="This year"
        timeline={months}
        progress={progressYear}
      />
    </React.Fragment>
  );
};
export default Progress;
