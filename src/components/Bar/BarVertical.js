import React from "react";
import styled from "styled-components";
import Box from "../UI/Layout/Box";

const Wrapper = styled(Box)`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    height: 200px;
  }
`;

const Bar = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.gray100};
  /* border-radius: 60px; */
  z-index: 2;
  overflow: hidden;
  height: 100%;
`;

const Progress = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;

  &::before {
    ${(props) =>
      props.theme.mixins.transitionSnappy(
        "height",
        "1s",
        "cubic-bezier(0.86, 0, 0.07, 1)",
        props.delay ? `${props.delay}ms` : `0ms`
      )}
    content: " ";
    position: absolute;
    z-index: 1;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.green};
    height: ${(props) => props.progress}%;
  }

  &::after {
    ${(props) =>
      props.theme.mixins.transitionSnappy(
        "height",
        "1s",
        "cubic-bezier(0.86, 0, 0.07, 1)",
        props.delay ? `${props.delay}ms` : `0ms`
      )}
    content: " ";
    position: absolute;
    z-index: 0;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.orange};
    height: ${(props) => props.target}%;
  }
`;

const BarVertical = ({ progress, target, delay = 0 }) => {
  return (
    <Wrapper>
      <Bar className="Bar">
        <Progress
          className="Progress"
          progress={progress}
          target={target}
          delay={delay}
        />
      </Bar>
    </Wrapper>
  );
};

export default BarVertical;
