import React from "react";
import styled from "styled-components";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";
import Text from "../UI/Typography/Text";

import Counter from "../Counter/Counter";

const CounterMobile = styled(Box)`
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    width: 10px;
  }
`;

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
        label: { mobile: "Km", desktop: "Pace" },
        alignment: "left"
      },
      {
        label: { mobile: "Km left", desktop: "Target" },
        alignment: "left"
      },
      {
        label: { mobile: "Days left", desktop: "Goal" },
        alignment: "left"
      },
      {
        label: { mobile: "Expected", desktop: "Days" },
        alignment: "right"
      }
    ],
    rows: [
      {
        label: { mobile: "W", desktop: "Weekly" },
        columnsLeft: [
          { data: weekDistancePace, difference: null, type: "km" },
          {
            data: weekDistanceTarget,
            difference: weekDistanceTargetDifference,
            type: "km"
          },
          {
            data: weekDistanceGoal,
            difference: weekDistanceGoalDifference,
            type: "km"
          }
        ],
        columnsRight: [
          {
            data: weekDaysLeft,
            difference: null,
            type: "left"
          }
        ]
      },
      {
        label: { mobile: "M", desktop: "Monthly" },
        columnsLeft: [
          { data: monthDistancePace, difference: null, type: "km" },
          {
            data: monthDistanceTarget,
            difference: monthDistanceTargetDifference,
            type: "km"
          },
          {
            data: monthDistanceGoal,
            difference: monthDistanceGoalDifference,
            type: "km"
          }
        ],
        columnsRight: [
          {
            data: monthDaysRemaining,
            difference: null,
            type: "left"
          }
        ]
      },
      {
        label: { mobile: "Y", desktop: "Yearly" },
        columnsLeft: [
          { data: yearDistancePace, difference: null, type: "km" },
          {
            data: yearDistanceTarget,
            difference: yearDistanceTargetDifference,
            type: "km"
          },
          {
            data: yearDistanceGoal,
            difference: yearDistanceGoalDifference,
            type: "km"
          }
        ],
        columnsRight: [
          {
            data: yearDaysRemaining,
            difference: null,
            type: "left"
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
                  width={[
                    index < 1
                      ? 1 / 6
                      : index === headers.length - 1
                      ? 2 / 6
                      : 1 / 6,
                    null,
                    null,
                    isRight ? 1 / 11 : 2 / 9
                  ]}
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
          const { label, columnsLeft, columnsRight } = row;
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

              {columnsLeft &&
                columnsLeft.length > 0 &&
                columnsLeft.map((column, index) => {
                  const { data, type, difference } = column;
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[1 / 6, null, null, 2 / 9]}
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <CounterMobile>
                        {view > 1 ? (
                          <Counter number={data} value={type} />
                        ) : (
                          `0 ${type}`
                        )}
                      </CounterMobile>

                      {difference && (
                        <CounterMobile
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
                        </CounterMobile>
                      )}
                    </Column>
                  );
                })}

              {columnsRight &&
                columnsRight.length > 0 &&
                columnsRight.map((column, index) => {
                  const { data, difference, type } = column;
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[2 / 6, null, null, 1 / 9]}
                      ml="auto"
                      textAlign="right"
                    >
                      <Flex
                        flexDirection="row"
                        justifyContent={[
                          "space-between",
                          null,
                          null,
                          "flex-end"
                        ]}
                      >
                        {difference && (
                          <Flex
                            flexDirection="row"
                            justifyContent="flex-end"
                            color={
                              Math.sign(difference) === -1 ? "orange" : null
                            }
                          >
                            <CounterMobile>
                              {view > 1 ? (
                                <Counter
                                  number={difference}
                                  sign={true}
                                  value={""}
                                />
                              ) : (
                                ``
                              )}
                            </CounterMobile>
                          </Flex>
                        )}
                        <Flex
                          width={["24px", null, null, "96px"]}
                          flexDirection="row"
                          justifyContent={[
                            "flex-start",
                            null,
                            null,
                            "flex-end"
                          ]}
                        >
                          <CounterMobile>
                            {view > 1 ? (
                              <Counter number={data} value={type} />
                            ) : (
                              `0 ${type}`
                            )}
                          </CounterMobile>
                        </Flex>
                      </Flex>
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
