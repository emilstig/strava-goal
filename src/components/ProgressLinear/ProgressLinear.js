import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Box from "../UI/Layout/Box";
import H3 from "../UI/Typography/H3";

import ProgressBar from "../ProgressBar/ProgressBar";
import Timeline from "../Timeline/Timeline";
import Counter from "../Counter/Counter";
import { PaceIcon } from "../UI/Icons/Icons";
import IconButton from "../UI/IconButton/IconButton";

const Wrapper = styled(Container)`
  ${({ theme }) => theme.mixins.transitionStandard("opacity", "0.6s")}
  opacity: 1;

  &.active {
    .distance {
      opacity: 0.64;

      &.distance--left {
        transform-origin: left top;
        transform: translateY(-19px) translateX(1px) scale(0.89);

        @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
          transform: translateY(-20px) translateX(3px) scale(0.69);
        }
      }
      &.distance--right {
        transform-origin: right top;
        transform: translateY(-19px) translateX(-1px) scale(0.89);

        @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
          transform: translateY(-20px) translateX(-3px) scale(0.69);
        }
      }
    }
    .difference {
      opacity: 1;
      transform: translateY(-29px);

      @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
        transform: translateY(-38px);
      }
    }
  }
`;

const Actions = styled(Box)`
  transform: translateX(8px) translateY(6px);
  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    transform: translateX(4px) translateY(4px);
  }
`;

const Distance = styled(Column)`
  ${({ theme }) => theme.mixins.transitionStandard("all", "0.6s")}
  transform: translateY(0px) translateX(0px) scale(1);
  opacity: 1;

  &.distance--left {
    transform-origin: left top;
  }
  &.distance--right {
    transform-origin: right top;
  }
`;

const ProgressLinear = ({
  title,
  progress,
  timeline,
  timelineMobile,
  onClick,
  isActive,
}) => {
  const {
    distance,
    distanceGoal,
    distanceTargetDifference,
    distanceGoalDifference,
    currentDistance,
    targetDistance,
  } = progress;
  const [stats, setStats] = useState({
    distance: 0,
    distanceGoal: 0,
    distanceTargetDifference: 0,
    distanceGoalDifference: 0,
    currentDistance: 0,
    targetDistance: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        distance,
        distanceGoal,
        distanceTargetDifference,
        distanceGoalDifference,
        currentDistance,
        targetDistance,
      });
    }, 1);
  }, [
    currentDistance,
    distance,
    distanceGoal,
    distanceGoalDifference,
    distanceTargetDifference,
    targetDistance,
  ]);

  return (
    <Wrapper className={isActive ? `active` : ``}>
      <Row
        alignItems="flex-end"
        justifyContent="space-between"
        flexDirection="row"
        pt={[3, null, null, 4]}
        pb={[3, null, null, 3]}
      >
        <Column width={"auto"}>
          <H3 className="title">{title}</H3>
        </Column>
        <Column>
          <Actions>
            <IconButton className={isActive ? `active` : ``} onClick={onClick}>
              <PaceIcon width={20} height={20} color={"rgba(20,20,20,0.54)"} />
            </IconButton>
          </Actions>
        </Column>
      </Row>
      <Row
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        pb={[1, null, null, 1]}
      >
        <Distance className="distance distance--left">
          {stats.distance !== 0 ? (
            <Counter number={stats.distance} value="km" />
          ) : (
            "0 km"
          )}
        </Distance>
        <Distance className="distance distance--right">{`${
          stats.distanceGoal !== 0 ? Math.round(stats.distanceGoal) : 0
        } km`}</Distance>
      </Row>

      <Row flexDirection="column">
        <Column width={1} pb={[0, null, null, 0]}>
          <ProgressBar
            progress={{
              distanceTargetDifference: stats.distanceTargetDifference,
              distanceGoalDifference: stats.distanceGoalDifference,
              currentDistance: stats.currentDistance,
              targetDistance: stats.targetDistance,
            }}
          />
        </Column>
        {timeline && (
          <Column width={1}>
            <Timeline timeline={timeline} timelineMobile={timelineMobile} />
          </Column>
        )}
      </Row>
    </Wrapper>
  );
};
export default ProgressLinear;
