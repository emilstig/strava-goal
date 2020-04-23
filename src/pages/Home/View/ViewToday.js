import React, { useState } from "react";

import { getTimeline } from "../../../helpers/getTimeline";
import ProgressLinear from "../../../components/ProgressLinear/ProgressLinear";
import Box from "../../../components/UI/Layout/Box";
import Switch from "../../../components/UI/Switch/Switch";
import { roundedToFixed } from "../../../helpers/formatNumbers";

import Container from "../../../components/UI/Layout/Grid/Container";
import Row from "../../../components/UI/Layout/Grid/Row";
import Column from "../../../components/UI/Layout/Grid/Column";

const ViewToday = ({ stats }) => {
  const [toggle, setToggle] = useState(false);

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
    distance: roundedToFixed(week.distancePace, 1),
    distanceGoal: roundedToFixed(week.distanceGoal, 0),
    distanceTargetDifference: roundedToFixed(week.distanceTargetDifference, 1),
    distanceGoalDifference: roundedToFixed(week.distanceGoalDifference, 1),
    distanceAmount: roundedToFixed(weekCurrent, 1),
    distanceTargetAmount: roundedToFixed(weekTarget, 1),
  };

  // Month
  const monthCurrent = (month.distancePace / month.distanceGoal) * 100;
  const monthTarget = (month.distanceTarget / month.distanceGoal) * 100;
  const progressMonth = {
    distance: month.distancePace,
    distanceGoal: roundedToFixed(month.distanceGoal, 0),
    distanceTargetDifference: roundedToFixed(month.distanceTargetDifference, 0),
    distanceGoalDifference: roundedToFixed(month.distanceGoalDifference, 0),
    distanceAmount: monthCurrent,
    distanceTargetAmount: monthTarget,
  };

  // Year
  const yearCurrent = (year.distancePace / year.distanceGoal) * 100;
  const yearTarget = (year.distanceTarget / year.distanceGoal) * 100;
  const progressYear = {
    distance: year.distancePace,
    distanceGoal: roundedToFixed(year.distanceGoal, 0),
    distanceTargetDifference: roundedToFixed(year.distanceTargetDifference, 0),
    distanceGoalDifference: roundedToFixed(year.distanceGoalDifference, 0),
    distanceAmount: yearCurrent,
    distanceTargetAmount: yearTarget,
  };

  const contents = [
    {
      title: "This week",
      timeline: weekDays,
      timelineMobile: null,
      progress: progressWeek,
      decimals: 1,
    },
    {
      title: "This month",
      timeline: monthDays,
      timelineMobile: monthWeeks,
      progress: progressMonth,
      decimals: 0,
    },
    {
      title: "This year",
      timeline: yearMonths,
      timelineMobile: null,
      progress: progressYear,
      decimals: 0,
    },
  ];

  return (
    <React.Fragment>
      <Container pt={[2, null, null, 2]} pb={[1, null, null, 1]}>
        <Row flexDirection="row" justifyContent="flex-end">
          <Column>
            <Switch
              name="details"
              label={{ left: "Pace" }}
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
              <ProgressLinear isActive={toggle} {...content} />
            </Box>
          );
        })}
    </React.Fragment>
  );
};
export default ViewToday;
