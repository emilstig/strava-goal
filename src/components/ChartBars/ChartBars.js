import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Box from "../UI/Layout/Box";
import H3 from "../UI/Typography/H3";

import { PaceIcon } from "../UI/Icons/Icons";
import IconButton from "../UI/IconButton/IconButton";
import BarVertical from "../Bar/BarVertical";
import Label from "../UI/Typography/Label";
import { Above, Below } from "../UI/Responsive/Breakpoints";

const Wrapper = styled(Container)``;

const Charts = styled(Box)`
  position: relative;
`;

const TargetLine = styled(Box)`
  position: absolute;
  z-index: 2;
  width: 100%;
  left: 0;
  bottom: calc(${(props) => props.target}%);
  height: 2px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 40%,
    ${({ theme }) => theme.colors.grayMedium} 0%
  );
  background-position: bottom;
  background-size: 16px 10px;
  background-repeat: repeat-x;
`;

const Actions = styled(Box)`
  transform: translateX(8px) translateY(6px);
  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    transform: translateX(4px) translateY(4px);
  }
`;

const Time = styled(Box)``;

const ChartBars = ({ title, charts, goal = 0, target = 0 }) => {
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
    <Wrapper>
      <Row
        alignItems="flex-end"
        justifyContent="space-between"
        flexDirection="row"
        pt={[3, null, null, 4]}
        pb={[4, null, null, 4]}
      >
        <Column>
          <H3 className="title">{title}</H3>
        </Column>
        <Column>
          <Actions>
            <IconButton>
              <PaceIcon width={20} height={20} color={"rgba(20,20,20,0.54)"} />
            </IconButton>
          </Actions>
        </Column>
      </Row>
      <Charts>
        <TargetLine target={targetAmount} />
        <Row flexDirection="row">
          {stats &&
            stats.length > 0 &&
            stats.map((chart, index) => {
              const { distance } = chart;
              const progressAmount =
                target < goal
                  ? (distance / goal) * 100
                  : (distance / target) * 100;

              return (
                <Column key={`bar-${index}`} width={[1 / 12]}>
                  <BarVertical
                    delay={index * 100}
                    progress={progressAmount}
                    target={progressAmount > 0 ? targetAmount : 0}
                  />
                </Column>
              );
            })}
        </Row>
      </Charts>
      <Row flexDirection="row">
        {stats &&
          stats.length > 0 &&
          stats.map((chart, index) => {
            const { label } = chart;

            return (
              <Column key={`time-${index}`} width={[1 / 12]}>
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
              </Column>
            );
          })}
      </Row>
    </Wrapper>
  );
};

export default ChartBars;
