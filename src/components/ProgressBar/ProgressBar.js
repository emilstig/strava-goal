import React from "react";
import styled from "styled-components";
import Counter from "../Counter/Counter";
import Box from "../UI/Layout/Box";

const Wrapper = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray2};
  height: 54px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: 63px;
  }

  div {
    position: relative;
    z-index: 4;
    padding: 0 16px;
  }

  &::before {
    content: " ";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: width 1s cubic-bezier(0.86, 0, 0.07, 1);
    background-color: ${({ theme }) => theme.colors.orange};
    width: ${props => props.progress}%;
  }

  &::after {
    content: " ";
    position: absolute;
    z-index: 3;
    width: 2px;
    height: calc(100% + 6px);
    left: ${props => props.goal}%;
    top: -3px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: scale(0);
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  }
`;

const ProgressBar = ({ data, view, onEnd }) => {
  const {
    yearPercentage,
    goalYearPercentage,
    yearDistance,
    goalDistance
  } = data;
  return (
    <Wrapper
      className="ProgressBar"
      progress={yearPercentage}
      goal={goalYearPercentage}
    >
      <div>
        {view > 0 ? <Counter number={yearDistance} value="km" /> : "0 km"}
      </div>
      <div>
        {view > 0 ? (
          <Counter
            onEnd={onEnd ? () => onEnd() : null}
            number={goalDistance}
            value="km"
          />
        ) : (
          "0 km"
        )}
      </div>
    </Wrapper>
  );
};

export default ProgressBar;
