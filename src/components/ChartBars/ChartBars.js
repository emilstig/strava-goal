import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";

import Column from "../UI/Layout/Grid/Column";
import Flex from "../UI/Layout/Flex";
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
      left: -44px;

      @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
        left: -47px;
      }
    }

    .info {
      opacity: 1;
      left: -47px;

      .label {
        transform: translate(-50%, -50%) scale(1);

        @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }

    .table {
      width: 48px;
      padding: 0 8px;
      opacity: 1;
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

const DistanceTableWrapper = styled(Flex)`
  ${({ theme }) => theme.mixins.transitionSnappy("all", "0.8s")}
  width: 0;
  opacity: 0;
  padding: 0;
`;

const DistanceTable = styled(Box)`
  position: relative;
  height: calc(100% - 45px);
  width: 100%;
  background-image: repeating-linear-gradient(
    to top,
    ${({ theme }) => theme.colors.gray} 0%,
    ${({ theme }) => theme.colors.gray} ${(props) => props.rowHeight}%,
    ${({ theme }) => theme.colors.gray100} ${(props) => props.rowHeight}%,
    ${({ theme }) => theme.colors.gray100} ${(props) => props.rowHeight * 2}%
  );

  .goal {
    position: absolute;
    left: 0;
    text-align: center;
    width: 100%;
    line-height: 1.3em;
    transform: translate(0px, 50%);
    bottom: calc(${(props) => props.targetTop}%);

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      line-height: 1.2em;
      transform: translate(0px, 50%);
      bottom: calc(${(props) => props.targetTop}% + 2px);
    }
  }
`;

const TargetLine = styled(Box)`
  ${({ theme }) => theme.mixins.transitionStandard("all", "0.6s")}
  position: absolute;
  z-index: 2;
  width: calc(100vw - ${({ theme }) => theme.space[4]});
  left: 0;
  background-color: transparent;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 40%,
    ${({ theme }) => theme.colors.gray300} 0%
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

const Info = styled(Box)`
  ${({ theme }) => theme.mixins.transitionStandard("all", "0.6s")}
  position: absolute;
  z-index: 3;
  left: 0;
  width: calc(100vw - ${({ theme }) => theme.space[4]});
  opacity: 0;
  bottom: ${(props) => props.target + 45 / 100}%;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    bottom: calc(${(props) => props.target}%);
  }

  .label {
    position: absolute;
    z-index: 3;
    left: 50%;
    background-color: black;
    color: white;
    transform: translate(-50%, -50%) scale(0);
    padding: 2px 2px 3px 2px;
    width: 75px;

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      padding: 6px;
      width: 99px;
    }
  }
`;

const ChartColumn = styled(Column)`
  position: relative;
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
  const divider = goal > 20 ? 10 : 1;
  const rowHeight = (divider / goal) * 100;

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

      <Row flexDirection="row" flexWrap="no-wrap">
        <DistanceTableWrapper className="table">
          <DistanceTable targetTop={targetAmount} rowHeight={rowHeight}>
            <Paragraph className="goal">
              {target} km
              {/* <Above breakpoint="desktop">{target} km</Above>
              <Below breakpoint="desktop">{target}</Below> */}
            </Paragraph>
          </DistanceTable>
        </DistanceTableWrapper>

        <Column width={1}>
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
                          {distance && distance}
                          {` `}km
                        </Above>
                        <Below breakpoint="desktop">
                          {distance && distance}
                        </Below>
                      </Paragraph>
                    </Distance>

                    <Charts>
                      {index === 0 && (
                        <React.Fragment>
                          <TargetLine className="line" target={targetAmount} />
                          <Info className="info" target={targetAmount}>
                            <Label className="label">Avg Goal</Label>
                          </Info>
                        </React.Fragment>
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
        </Column>
      </Row>
    </Wrapper>
  );
};

export default ChartBars;
