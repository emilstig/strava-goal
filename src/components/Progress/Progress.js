import React from "react";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import H3 from "../UI/Typography/H3";

import ProgressBar from "../ProgressBar/ProgressBar";
import Timeline from "../Timeline/Timeline";

const Progress = ({ goal, stats, view, setView }) => {
  const { yearDistancePace, yearPercentageCurrent, yearPercentageGoal } = stats;
  return (
    <React.Fragment>
      {/* <Container>
        <Row justifyContent="space-between" flexDirection="row">
          <Column>
            <H3>Progress</H3>
          </Column>
        </Row>
      </Container> */}
      <ProgressBar
        stats={{ yearDistancePace, yearPercentageCurrent, yearPercentageGoal }}
        goal={goal}
        view={view}
        onEnd={() => {
          setView(2);
        }}
      />
      <Timeline goal={goal} />
    </React.Fragment>
  );
};
export default Progress;
