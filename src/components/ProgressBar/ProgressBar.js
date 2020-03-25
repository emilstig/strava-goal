import React from "react";
import styled from "styled-components";
import Counter from "../Counter/Counter";
import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";

const Wrapper = styled(Container)`
  position: relative;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.gray2};
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
    background-color: ${({ theme }) => theme.colors.orange};
    width: ${props => props.progress}%;
  }

  &::after {
    ${({ theme }) => theme.mixins.transitionSnappy("transform", "0.8s")}
    content: " ";
    position: absolute;
    z-index: 3;
    width: 2px;
    height: calc(100% + 6px);
    left: ${props => props.goal}%;
    top: -3px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: scale(0);
  }
`;

const ProgressBar = ({ stats, goal, view, onEnd }) => {
  const {
    yearDistanceCurrent,
    yearPercentageCurrent,
    yearPercentageGoal
  } = stats;

  return (
    <Wrapper
      className="ProgressBar"
      progress={yearPercentageCurrent}
      goal={yearPercentageGoal}
    >
      <Row
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Column className="Column">
          {view > 0 ? (
            <Counter onEnd={onEnd} number={yearDistanceCurrent} value="km" />
          ) : (
            "0 km"
          )}
        </Column>
        <Column className="Column">{`${goal} km`}</Column>
      </Row>
    </Wrapper>
  );
};

export default ProgressBar;
