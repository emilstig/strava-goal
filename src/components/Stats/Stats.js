import React from "react";
import styled from "styled-components";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Flex from "../UI/Layout/Flex";
import Text from "../UI/Typography/Text";

import Counter from "../Counter/Counter";

const CounterMobile = styled.span`
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
    yearDistanceCurrent,
    yearDistanceRemaining,
    yearDaysRemaining,
    yearDistanceExpected,
    yearDistanceExpectedDifference,
    monthDistanceCurrent,
    monthDistanceRemaining,
    monthDaysRemaining,
    monthDistanceExpected,
    monthDistanceExpectedDifference,
    weekDistanceCurrent,
    weekDistanceLeft,
    weekDaysLeft,
    weekDistanceExpected,
    weekDistanceExpectedDifference
  } = stats;
  const current = {
    headers: [
      {
        label: { mobile: "", desktop: "" },
        alignment: "left"
      },
      {
        label: { mobile: "Km", desktop: "Distance" },
        alignment: "left"
      },
      {
        label: { mobile: "Km left", desktop: "Distance left" },
        alignment: "left"
      },
      {
        label: { mobile: "Days left", desktop: "Days left" },
        alignment: "left"
      },
      {
        label: { mobile: "Expected", desktop: "Expected" },
        alignment: "right"
      }
    ],
    rows: [
      {
        label: { mobile: "W", desktop: "Week" },
        columnsLeft: [
          { data: weekDistanceCurrent, type: "km" },

          { data: weekDistanceLeft, type: "km" },
          { data: weekDaysLeft, type: "" }
        ],
        columnsRight: [
          {
            data: weekDistanceExpected,
            difference: weekDistanceExpectedDifference,
            type: "km"
          }
        ]
      },
      {
        label: { mobile: "M", desktop: "Month" },
        columnsLeft: [
          { data: monthDistanceCurrent, type: "km" },
          { data: monthDistanceRemaining, type: "km" },
          { data: monthDaysRemaining, type: "" }
        ],
        columnsRight: [
          {
            data: monthDistanceExpected,
            difference: monthDistanceExpectedDifference,
            type: "km"
          }
        ]
      },
      {
        label: { mobile: "Y", desktop: "Year" },
        columnsLeft: [
          { data: yearDistanceCurrent, type: "km" },
          { data: yearDistanceRemaining, type: "km" },
          { data: yearDaysRemaining, type: "" }
        ],
        columnsRight: [
          {
            data: yearDistanceExpected,
            difference: yearDistanceExpectedDifference,
            type: "km"
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
                    2 / 12
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
              <Column width={[1 / 6, null, null, 2 / 12]}>
                <Label className="Label__mobile">{label.mobile}</Label>
                <Label className="Label__desktop">{label.desktop}</Label>
              </Column>

              {columnsLeft &&
                columnsLeft.length > 0 &&
                columnsLeft.map((column, index) => {
                  const { data, type } = column;
                  return (
                    <Column
                      key={"stat-" + index}
                      width={[1 / 6, null, null, 2 / 12]}
                    >
                      <CounterMobile>
                        {view > 1 ? (
                          <Counter number={data} value={type} />
                        ) : (
                          `0 ${type}`
                        )}
                      </CounterMobile>
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
                      width={[2 / 6, null, null, 2 / 12]}
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
                        <Flex
                          flexDirection="row"
                          justifyContent="flex-end"
                          color={Math.sign(difference) === -1 ? "orange" : null}
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
