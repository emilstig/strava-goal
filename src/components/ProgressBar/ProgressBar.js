import React from "react";
import styled from "styled-components";
import Counter from "../Counter/Counter";
import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";

const Progress = styled(Container)`
  position: relative;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.grayLight};
  height: 54px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: 63px;
  }

  .Column {
    position: relative;
    z-index: 4;
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
    width: ${props => props.progress}%;
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
    width: ${props => props.goal}%;
  }
`;

const Bar = styled(Row)`
  position: relative;
  z-index: 2;

  &::after {
    ${({ theme }) => theme.mixins.transitionSnappy("transform", "0.8s")}
    content: " ";
    position: absolute;
    z-index: 3;
    width: 2px;
    height: calc(100% + 6px);
    left: calc(${props => props.goal}% - 4px);
    top: -3px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: scale(0);
  }
`;

const ProgressBar = ({ stats, goal, view, onEnd }) => {
  const { yearDistancePace, yearPercentageCurrent, yearPercentageGoal } = stats;

  return (
    <Progress
      className="Progress"
      progress={yearPercentageCurrent}
      goal={yearPercentageCurrent === 0 ? 0 : yearPercentageGoal}
    >
      <Bar
        className="Bar"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        goal={yearPercentageCurrent === 0 ? 0 : yearPercentageGoal}
      >
        <Column className="Column">
          {view > 0 ? (
            <Counter onEnd={onEnd} number={yearDistancePace} value="km" />
          ) : (
            "0 km"
          )}
        </Column>
        <Column className="Column">{`${goal} km`}</Column>
      </Bar>
    </Progress>
  );
};

export default ProgressBar;
