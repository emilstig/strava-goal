import React from "react";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import H3 from "../UI/Typography/H3";
import Label from "../UI/Typography/Label";

import ProgressBar from "../ProgressBar/ProgressBar";
import Timeline from "../Timeline/Timeline";
import Counter from "../Counter/Counter";

const ProgressLinear = ({ title, progress, timeline }) => {
  const { distance, distanceGoal, currentDistance, targetDistance } = progress;

  return (
    <React.Fragment>
      <Container>
        <Row justifyContent="space-between" flexDirection="row">
          <Column width={1}>
            <H3>
              <Label>{title}</Label>
            </H3>
          </Column>
        </Row>
        <Row
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pb={[1, null, null, 1]}
        >
          <Column className="Column">
            {distance !== 0 ? <Counter number={distance} value="km" /> : "0 km"}
          </Column>
          <Column className="Column">{`${
            distance !== 0 ? Math.round(distanceGoal) : 0
          } km`}</Column>
        </Row>

        <Row flexDirection="column">
          <Column width={1} pb={[0, null, null, 0]}>
            <ProgressBar
              progress={{
                distance,
                distanceGoal,
                currentDistance,
                targetDistance
              }}
            />
          </Column>
          {timeline && (
            <Column width={1}>
              <Timeline timeline={timeline} />
            </Column>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default ProgressLinear;
