import React from "react";
import styled from "styled-components";

import Box from "../UI/Layout/Box";
import Label from "../UI/Typography/Label";
import { Above, Below } from "../UI/Responsive/Breakpoints";

const Wrapper = styled(Box)`
  display: flex;
  width: 100%;
  height: 32px;
  /* border-radius: 60px; */
  overflow: hidden;
  height: 24px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: 32px;
  }

  .Time {
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

const Timeline = ({ timeline }) => {
  return (
    <Wrapper>
      {timeline &&
        timeline.map((time, index) => {
          const { title, width, isActive, isPassed } = time;
          return (
            <Box
              className="Time"
              key={`time-${title.full}-${index}`}
              opacity={isPassed ? 0.5 : 1}
              width={width}
            >
              <Label className="Label" fontWeight={isActive ? "600" : "500"}>
                <Above breakpoint="desktop">{title.full}</Above>
                <Below breakpoint="desktop">{title.truncated}</Below>
              </Label>
            </Box>
          );
        })}
    </Wrapper>
  );
};

export default Timeline;
