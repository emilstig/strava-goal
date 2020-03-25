import React from "react";
import styled from "styled-components";
import { getDaysInMonth } from "date-fns";

import Box from "../UI/Layout/Box";
import Label from "../UI/Typography/Label";

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
      background-color: ${({ theme }) => theme.colors.gray1};
    }

    .Month__desktop {
      display: none;

      @media (min-width: ${props => props.theme.breakpoints[2]}) {
        display: inline-block;
      }
    }
    .Month__mobile {
      display: inline-block;

      @media (min-width: ${props => props.theme.breakpoints[2]}) {
        display: none;
      }
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
              <Label className="Month__desktop">{month.substring(0, 3)}</Label>
              <Label className="Month__mobile">{month.substring(0, 1)}</Label>
            </div>
          );
        })}
    </Wrapper>
  );
};

export default Timeline;
