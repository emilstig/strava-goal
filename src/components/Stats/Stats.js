import React from "react";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";

import Counter from "../Counter/Counter";

const Stats = ({ stats, view }) => {
  return (
    <React.Fragment>
      {stats &&
        stats.length > 0 &&
        stats.map((stat, index) => {
          const { label, distances, result } = stat;
          return (
            <Row
              key={"stats-" + index}
              py={[2, null, null, 2]}
              bg={index % 2 === 1 ? "gray2" : ""}
              flexDirection="row"
            >
              <Column width={[3 / 12, null, null, 2 / 12]}>
                {label && label}
              </Column>

              {distances &&
                distances.length > 0 &&
                distances.map((distance, index) => {
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[3 / 12, null, null, 2 / 12]}
                    >
                      {view > 1 ? (
                        <Counter number={distance} value="km" />
                      ) : (
                        "0 km"
                      )}
                    </Column>
                  );
                })}

              <Column
                width={[3 / 12, null, null, 2 / 12]}
                ml="auto"
                textAlign="right"
              >
                {result && result > 0 && view > 1 ? (
                  <Counter number={result} value="km" />
                ) : (
                  "0 km"
                )}
              </Column>
            </Row>
          );
        })}
    </React.Fragment>
  );
};

export default Stats;
