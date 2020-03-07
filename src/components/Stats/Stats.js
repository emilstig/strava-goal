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
          const { label, columnsLeft, columnsRight } = stat;
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

              {columnsLeft &&
                columnsLeft.length > 0 &&
                columnsLeft.map((column, index) => {
                  const { data, type } = column;
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[3 / 12, null, null, 2 / 12]}
                    >
                      {view > 1 ? (
                        <Counter number={data} value={type} />
                      ) : (
                        `0 ${type}`
                      )}
                    </Column>
                  );
                })}

              {columnsRight &&
                columnsRight.length > 0 &&
                columnsRight.map((column, index) => {
                  const { data, type } = column;
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[3 / 12, null, null, 2 / 12]}
                      ml="auto"
                      textAlign="right"
                    >
                      {view > 1 ? (
                        <Counter number={data} value={type} />
                      ) : (
                        `0 ${type}`
                      )}{" "}
                      {/* (+ 4) */}
                    </Column>
                  );
                })}
            </Row>
          );
        })}
    </React.Fragment>
  );
};

export default Stats;
