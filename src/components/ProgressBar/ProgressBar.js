import React from "react";
import styled from "styled-components";
import Box from "../UI/Layout/Box";

const Progress = styled(Box)`
  position: relative;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.grayLight};
  height: 24px;
  border-radius: 60px;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    height: 24px;
  }

  &::before {
    ${({ theme }) => theme.mixins.transitionSnappy("width", "1s")}
    content: " ";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${({ theme }) => theme.colors.green};
    width: ${(props) => props.progress}%;
  }

  &::after {
    ${({ theme }) => theme.mixins.transitionSnappy("width", "1s")}
    content: " ";
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${({ theme }) => theme.colors.orange};
    width: ${(props) => props.target}%;
  }
`;

const Bar = styled(Box)`
  position: relative;
  z-index: 2;

  &::after {
    ${({ theme }) => theme.mixins.transitionSnappy("transform", "0.8s")}
    content: " ";
    position: absolute;
    z-index: 3;
    width: 2px;
    height: calc(100% + 6px);
    left: calc(${(props) => props.target}%);
    top: -3px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: scale(${(props) => (props.target ? 1 : 0)});
  }
`;

const ProgressBar = ({ progress }) => {
  const { distance, distanceGoal, currentDistance, targetDistance } = progress;

  return (
    <Progress
      className="Progress"
      progress={currentDistance}
      target={currentDistance === 0 ? 0 : targetDistance}
    >
      <Bar
        className="Bar"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        target={
          currentDistance > 100
            ? null
            : currentDistance === 0
            ? 0
            : targetDistance
        }
      ></Bar>
    </Progress>
  );
};

export default ProgressBar;
