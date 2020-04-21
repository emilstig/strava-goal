import React, { useState } from "react";
import styled from "styled-components";
import { getTimeline } from "../../helpers/getTimeline";
import ProgressLinear from "../ProgressLinear/ProgressLinear";
import Box from "../UI/Layout//Box";
import { roundedToFixed } from "../../helpers/formatNumbers";

const Wrapper = styled(Box)`
  &.active {
    > *:not(.active) {
      opacity: 0.54;
    }
  }
`;

const Pace = ({ stats }) => {
  const [toggle, setToggle] = useState(null);

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

  const content = [
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
    <Wrapper className={toggle !== null ? "active" : ""}>
      {content &&
        content.length > 0 &&
        content.map((content, index) => {
          return (
            <ProgressLinear
              isActive={toggle === index}
              onClick={() =>
                toggle !== index ? setToggle(index) : setToggle(null)
              }
              {...content}
            />
          );
        })}
    </Wrapper>
  );
};
export default Pace;
