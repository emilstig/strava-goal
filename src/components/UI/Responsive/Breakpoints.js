import * as React from "react";
import styled from "styled-components";

const labels = ["xs", "s", "mobile", "desktop", "l", "xl"];
const breakpoints = ["576px", "768px", "992px", "993px", "1280px", "1600px"];

const breakpointsMax = ["575px", "767px", "991px", "992px", "1279px", "1599px"];

const AboveWrapper = styled.div`
  @media (max-width: ${props =>
      breakpointsMax[labels.indexOf(props.breakpoint)]}) {
    display: none;
  }
`;

const BelowWrapper = styled.div`
  @media (min-width: ${props =>
      breakpoints[labels.indexOf(props.breakpoint)]}) {
    display: none;
  }
`;

const Above = ({ breakpoint, children }) => (
  <AboveWrapper breakpoint={breakpoint}>{children}</AboveWrapper>
);
const Below = ({ breakpoint, children }) => (
  <BelowWrapper breakpoint={breakpoint}>{children}</BelowWrapper>
);

export { Above, Below };
