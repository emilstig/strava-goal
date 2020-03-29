import React from "react";
import styled from "styled-components";
import { getDaysInMonth } from "date-fns";

import Box from "../UI/Layout/Box";
import Label from "../UI/Typography/Label";
import { Above, Below } from "../UI/Responsive/Breakpoints";

import {
  months,
  currentMonth,
  currentYear,
  totalDaysOfYear
} from "../../helpers/getDates";

const Wrapper = styled(Box)`
  display: flex;
  width: 100%;
  height: 26px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: 52px;
  }

  .Month {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray};
    }

    .Label {
      text-align: center;
    }
  }
`;

const Timeline = ({ goal }) => {
  return (
    <Wrapper>
      {months &&
        months.map((month, index) => {
          const monthDays = getDaysInMonth(new Date(currentYear, index));
          const monthDistance = (goal / totalDaysOfYear) * monthDays;
          const monthWidth = (Math.round(monthDistance) / goal) * 100 + "%";

          return (
            <div
              className="Month"
              key={"month-" + index}
              style={{
                opacity: index < currentMonth ? 0.5 : 1,
                width: monthWidth
              }}
            >
              <Label className="Label">
                <Above breakpoint="desktop">{month.substring(0, 3)}</Above>
                <Below breakpoint="desktop">{month.substring(0, 1)}</Below>
              </Label>
            </div>
          );
        })}
    </Wrapper>
  );
};

export default Timeline;
