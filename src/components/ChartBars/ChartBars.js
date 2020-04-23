import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Box from "../UI/Layout/Box";
import H3 from "../UI/Typography/H3";
import Paragraph from "../UI/Typography/Paragraph";

import BarVertical from "../Bar/BarVertical";
import Label from "../UI/Typography/Label";
import { Above, Below } from "../UI/Responsive/Breakpoints";

const Wrapper = styled(Container)`
  &.active {
    .line {
      background-color: ${({ theme }) => theme.colors.black};
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0) 0%
      );
    }
    .distance {
      opacity: 1;
      transform: translateY(-100%);

      @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
        transform: translateY(-100%);
      }
    }
  }
`;

const ChartColumn = styled(Column)`
  position: relative;
`;

const TargetLine = styled(Box)`
  ${({ theme }) => theme.mixins.transitionStandard("background", "0.6s")}
  position: absolute;
  z-index: 2;
  width: calc(100vw - ${({ theme }) => theme.space[4]});
  left: 0;
  background-color: transparent;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 40%,
    ${({ theme }) => theme.colors.grayMedium} 0%
  );
  background-position: bottom;
  background-size: 16px 10px;
  background-repeat: repeat-x;
  height: 1px;
  bottom: ${(props) => props.target + 45 / 100}%;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    bottom: calc(${(props) => props.target}%);
    height: 2px;
  }
`;

const Distance = styled(Box)`
  ${(props) =>
    props.theme.mixins.transitionStandard(
      "all",
      "0.6s",
      "cubic-bezier(0.42, 0, 0.35, 1)",
      `${props.delay / 2}ms`
    )}
  opacity: 0;
  position: absolute;
  left: 0;
  width: 100%;

  transform: translateY(-80%);

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    transform: translateY(-80%);
  }

  .text {
    transform: translateX(-25%);

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      transform: translateX(0);
    }
  }
`;

const Charts = styled(Box)`
  position: relative;
`;

const Time = styled(Box)``;

const ChartBars = ({ title, charts, goal = 0, target = 0, isActive }) => {
  const [stats, setStats] = useState([
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
    { label: "", distance: 0 },
  ]);
  useEffect(() => {
    setTimeout(() => {
      setStats(charts);
    }, 1);
  }, [charts]);
  const targetAmount = target < goal ? (target / goal) * 100 : 100;

  return (
    <Wrapper className={isActive ? `active` : ``}>
      <Row
        alignItems="flex-end"
        justifyContent="space-between"
        flexDirection="row"
        pb={[5, null, null, 5]}
      >
        <Column>
          <H3 className="title">{title}</H3>
        </Column>
      </Row>

      <Row flexDirection="row">
        {stats &&
          stats.length > 0 &&
          stats.map((chart, index) => {
            const { distance, label } = chart;
            const progressAmount =
              target < goal
                ? (distance / goal) * 100
                : (distance / target) * 100;

            return (
              <ChartColumn key={`bar-${index}`} width={[1 / 12]}>
                <Distance
                  className="distance"
                  py={[1]}
                  textAlign="center"
                  fontSize={["14px", null, null, "18px"]}
                  color={distance === 0 ? "transparent" : "black"}
                  delay={index * 100}
                >
                  <Paragraph className="text">
                    <Above breakpoint="desktop">
                      {distance && Math.round(distance)}
                      {` `}km
                    </Above>
                    <Below breakpoint="desktop">
                      {distance && Math.round(distance)}
                    </Below>
                  </Paragraph>
                </Distance>

                <Charts>
                  {index === 0 && (
                    <TargetLine className="line" target={targetAmount} />
                  )}
                  <BarVertical
                    delay={index * 100}
                    progress={progressAmount}
                    target={progressAmount > 0 ? targetAmount : 0}
                  />
                </Charts>

                <Time py={[2]} textAlign="center">
                  <Above breakpoint="desktop">
                    {label && label.full && (
                      <Label className="Label" as="div">
                        {label.full}
                      </Label>
                    )}
                  </Above>
                  <Below breakpoint="desktop">
                    {label && label.truncated && (
                      <Label className="Label" as="div">
                        {label.truncated}
                      </Label>
                    )}
                  </Below>
                </Time>
              </ChartColumn>
            );
          })}
      </Row>
    </Wrapper>
  );
};

export default ChartBars;
