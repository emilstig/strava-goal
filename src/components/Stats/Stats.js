import React from "react";
import styled from "styled-components";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";

import Box from "../UI/Layout/Box";
import Text from "../UI/Typography/Text";

import Counter from "../Counter/Counter";

const CounterWrapper = styled(Box)``;

const Label = styled(Text)`
  &.Label__desktop {
    display: none;

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      display: inline-block;
    }
  }
  &.Label__mobile {
    display: inline-block;

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      display: none;
    }
  }
`;

const Stats = ({ stats, view }) => {
  const {
    // Year
    yearDistancePace,
    yearDistanceRemaining,
    yearDaysRemaining,
    yearDistanceTarget,
    yearDistanceTargetDifference,
    yearDistanceGoal,
    yearDistanceGoalDifference,

    // Month
    monthDistancePace,
    monthDistanceRemaining,
    monthDaysRemaining,
    monthDistanceTarget,
    monthDistanceTargetDifference,
    monthDistanceGoal,
    monthDistanceGoalDifference,

    // Week
    weekDistancePace,
    weekDistanceLeft,
    weekDaysLeft,
    weekDistanceTarget,
    weekDistanceTargetDifference,
    weekDistanceGoal,
    weekDistanceGoalDifference
  } = stats;
  const current = {
    headers: [
      {
        label: { mobile: "", desktop: "" },
        alignment: "left"
      },
      {
        label: { mobile: "Pace", desktop: "Pace" },
        alignment: "left"
      },
      {
        label: { mobile: "Target", desktop: "Target" },
        alignment: "left"
      },
      {
        label: { mobile: "Goal", desktop: "Goal" },
        alignment: "left"
      },
      {
        label: { mobile: "Days", desktop: "Days" },
        alignment: "right"
      }
    ],
    rows: [
      {
        label: { mobile: "W", desktop: "Weekly" },
        columns: [
          { data: weekDistancePace, difference: null, type: "km" },
          {
            data: weekDistanceTarget,
            difference: weekDistanceTargetDifference,
            type: "km",
            alignment: "left"
          },
          {
            data: weekDistanceGoal,
            difference: weekDistanceGoalDifference,
            type: "km",
            alignment: "left"
          },
          {
            data: weekDaysLeft,
            difference: null,
            type: "left",
            alignment: "right"
          }
        ]
      },
      {
        label: { mobile: "M", desktop: "Monthly" },
        columns: [
          { data: monthDistancePace, difference: null, type: "km" },
          {
            data: monthDistanceTarget,
            difference: monthDistanceTargetDifference,
            type: "km",
            alignment: "left"
          },
          {
            data: monthDistanceGoal,
            difference: monthDistanceGoalDifference,
            type: "km",
            alignment: "left"
          },
          {
            data: monthDaysRemaining,
            difference: null,
            type: "left",
            alignment: "right"
          }
        ]
      },
      {
        label: { mobile: "Y", desktop: "Yearly" },
        columns: [
          { data: yearDistancePace, difference: null, type: "km" },
          {
            data: yearDistanceTarget,
            difference: yearDistanceTargetDifference,
            type: "km",
            alignment: "left"
          },
          {
            data: yearDistanceGoal,
            difference: yearDistanceGoalDifference,
            type: "km",
            alignment: "left"
          },
          {
            data: yearDaysRemaining,
            difference: null,
            type: "left",
            alignment: "right"
          }
        ]
      }
    ]
  };

  const { headers, rows } = current;

  return (
    <React.Fragment>
      {headers && (
        <Row bg="gray2" py={[2, null, null, 2]} flexDirection="row">
          {headers.length > 0 &&
            headers.map((header, index) => {
              const { label, alignment } = header;
              const isRight = alignment === "right";
              return (
                <Column
                  key={"header-" + index}
                  className={index}
                  width={[isRight ? 1 / 11 : 2 / 9]}
                  ml={isRight ? "auto" : null}
                  textAlign={isRight ? "right" : null}
                >
                  <Label className="Label__mobile">{label.mobile}</Label>
                  <Label className="Label__desktop">{label.desktop}</Label>
                </Column>
              );
            })}
        </Row>
      )}
      {rows &&
        rows.length > 0 &&
        rows.map((row, index) => {
          const { label, columns } = row;
          return (
            <Row
              key={"row-" + index}
              py={[2, null, null, 2]}
              bg={index % 2 === 1 ? "gray2" : ""}
              flexDirection="row"
            >
              <Column width={[1 / 6, null, null, 2 / 9]}>
                <Label className="Label__mobile">{label.mobile}</Label>
                <Label className="Label__desktop">{label.desktop}</Label>
              </Column>

              {columns &&
                columns.length > 0 &&
                columns.map((column, index) => {
                  const { data, type, difference, alignment } = column;
                  const isRight = alignment === "right";
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[isRight ? 1 / 9 : 2 / 9]}
                      flexDirection="row"
                      justifyContent={isRight ? "flex-end" : "space-between"}
                      ml={isRight ? "auto" : 0}
                      textAlign={isRight ? "right" : "left"}
                    >
                      <CounterWrapper>
                        {view > 1 ? (
                          <Counter number={data} value={type} />
                        ) : (
                          `0 ${type}`
                        )}
                      </CounterWrapper>

                      {difference && (
                        <CounterWrapper
                          pr={"20%"}
                          color={Math.sign(difference) === -1 ? "orange" : null}
                        >
                          {"("}
                          {view > 1 ? (
                            <Counter
                              number={difference}
                              sign={true}
                              value={""}
                            />
                          ) : (
                            `0`
                          )}
                          {")"}
                        </CounterWrapper>
                      )}
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
