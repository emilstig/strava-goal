import React, { useState } from "react";

// import { getTimeline } from "../../helpers/getTimeline";
import ChartBars from "../../../components/ChartBars/ChartBars";
import Container from "../../../components/UI/Layout/Grid/Container";
import Row from "../../../components/UI/Layout/Grid/Row";
import Column from "../../../components/UI/Layout/Grid/Column";
import Switch from "../../../components/UI/Switch/Switch";
import Box from "../../../components/UI/Layout/Box";
import { roundedToFixed } from "../../../helpers/formatNumbers";

const ViewProgress = ({ stats }) => {
  const [toggle, setToggle] = useState(false);
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
  const pastDays =
    stats.day.past.map((day) => {
      const { label, distance } = day;
      return { label: label, distance: roundedToFixed(distance, 0) };
    }) || emptyCharts;

  const dayGoal =
    pastDays && pastDays.length > 0
      ? Math.max.apply(
          Math,
          pastDays.map(function (day) {
            return day.distance;
          })
        )
      : 0;
  const dayTarget = roundedToFixed(stats.day.average.distanceGoal, 0);

  // Past weeks
  const pastWeeks =
    stats.week.past.map((week) => {
      const { label, distance } = week;
      return { label: label, distance: roundedToFixed(distance, 0) };
    }) || emptyCharts;
  const weekGoal =
    pastWeeks && pastWeeks.length > 0
      ? Math.max.apply(
          Math,
          pastWeeks.map(function (week) {
            return week.distance;
          })
        )
      : 0;
  const weekTarget = roundedToFixed(stats.week.average.distanceGoal, 0);

  // Past months
  const pastMonths =
    stats.month.past.map((month) => {
      const { label, distance } = month;
      return { label: label, distance: roundedToFixed(distance, 0) };
    }) || emptyCharts;
  const monthGoal =
    pastMonths && pastMonths.length > 0
      ? Math.max.apply(
          Math,
          pastMonths.map(function (month) {
            return month.distance;
          })
        )
      : 0;
  const monthTarget = roundedToFixed(stats.month.average.distanceGoal, 0);

  const contents = [
    {
      title: "Last 12 days",
      charts: pastDays,
      goal: dayGoal,
      target: dayTarget,
    },
    {
      title: "Last 12 weeks",
      charts: pastWeeks,
      goal: weekGoal,
      target: weekTarget,
    },
    {
      title: "Last 12 months",
      charts: pastMonths,
      goal: monthGoal,
      target: monthTarget,
    },
  ];

  return (
    <React.Fragment>
      <Container pt={[2, null, null, 2]} pb={[1, null, null, 1]}>
        <Row flexDirection="row" justifyContent="flex-end">
          <Column>
            <Switch
              name="details"
              label={{ left: "Distance" }}
              checked={toggle}
              onChange={() => setToggle(!toggle)}
            />
          </Column>
        </Row>
      </Container>
      {contents &&
        contents.length > 0 &&
        contents.map((content, index) => {
          return (
            <Box
              key={index}
              mb={index === contents.length - 1 ? 0 : [3, null, null, 7]}
            >
              <ChartBars isActive={toggle} {...content} />
            </Box>
          );
        })}
    </React.Fragment>
  );
};
export default ViewProgress;
