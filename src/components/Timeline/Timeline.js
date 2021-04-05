import React from "react";
import styled from "styled-components";

import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";
import Label from "../UI/Typography/Label";
import { Above, Below } from "../UI/Responsive/Breakpoints";

const Wrapper = styled(Flex)`
  width: 100%;
  height: 32px;

  overflow: hidden;
  height: 24px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    height: 32px;
  }

  .Time {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray50};
    }

    .Label {
      text-align: center;
    }

    &.Time--passed {
      .Label {
        color: ${({ theme }) => theme.colors.gray400};
      }
    }
  }
`;

const Columns = ({ timeline }) => {
  return (
    <Wrapper>
      {timeline &&
        timeline.map((time, index) => {
          const { title, width, isActive, isPassed } = time;
          return (
            <Box
              className={["Time", isPassed ? "Time--passed" : ""].join(" ")}
              key={`time-${title.full}-${index}`}
              width={width}
            >
              <Label className="Label" color={isActive ? "gray900" : "gray800"}>
                <Above breakpoint="desktop">{title.full}</Above>
                <Below breakpoint="desktop">{title.truncated}</Below>
              </Label>
            </Box>
          );
        })}
    </Wrapper>
  );
};

const Timeline = ({ timeline, timelineMobile }) => {
  return (
    <React.Fragment>
      <Above breakpoint="desktop">
        <Columns timeline={timeline} />
      </Above>
      <Below breakpoint="desktop">
        <Columns timeline={timelineMobile ? timelineMobile : timeline} />
      </Below>
    </React.Fragment>
  );
};

export default Timeline;
