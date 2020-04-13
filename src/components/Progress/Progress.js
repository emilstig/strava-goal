import React from "react";

// import { getTimeline } from "../../helpers/getTimeline";
import ChartBars from "../ChartBars/ChartBars";

const Progress = ({ stats }) => {
  const emptyCharts = [
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
  ];

  // Past days
  const pastDays = stats.day.past || emptyCharts;
  const dayGoal =
    pastDays && pastDays.length > 0
      ? Math.max.apply(
          Math,
          pastDays.map(function (day) {
            return day.distance;
          })
        )
      : 0;
  const dayTarget = stats.day.average.distanceGoal;

  // Past weeks
  const pastWeeks = stats.week.past || emptyCharts;
  const weekGoal =
    pastWeeks && pastWeeks.length > 0
      ? Math.max.apply(
          Math,
          pastWeeks.map(function (week) {
            return week.distance;
          })
        )
      : 0;
  const weekTarget = stats.week.average.distanceGoal;

  // Past months
  const pastMonths = stats.month.past || emptyCharts;
  const monthGoal =
    pastMonths && pastMonths.length > 0
      ? Math.max.apply(
          Math,
          pastMonths.map(function (month) {
            return month.distance;
          })
        )
      : 0;
  const monthTarget = stats.month.average.distanceGoal;

  return (
    <React.Fragment>
      <ChartBars
        title="Last 12 days"
        charts={pastDays}
        goal={dayGoal}
        target={dayTarget}
      />
      <ChartBars
        title="Last 12 weeks"
        charts={pastWeeks}
        goal={weekGoal}
        target={weekTarget}
      />
      <ChartBars
        title="Last 12 months"
        charts={pastMonths}
        goal={monthGoal}
        target={monthTarget}
      />
    </React.Fragment>
  );
};
export default Progress;
