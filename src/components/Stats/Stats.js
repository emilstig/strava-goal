import React from "react";
import styled from "styled-components";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";

import Box from "../UI/Layout/Box";
import Label from "../UI/Typography/Label";
import { Above, Below } from "../UI/Responsive/Breakpoints";

import Counter from "../Counter/Counter";

const CounterWrapper = styled(Box)``;

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
        label: { mobile: "Days left", desktop: "Days left" },
        alignment: "right"
      }
    ],
    rows: [
      {
        label: { mobile: "W", desktop: "Week" },
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
            type: "",
            alignment: "right"
          }
        ]
      },
      {
        label: { mobile: "M", desktop: "Month" },
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
            type: "",
            alignment: "right"
          }
        ]
      },
      {
        label: { mobile: "Y", desktop: "Year" },
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
            type: "",
            alignment: "right"
          }
        ]
      }
    ]
  };

  const { headers, rows } = current;

  return (
    <React.Fragment>
      <Above breakpoint="desktop">
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
                    width={[isRight ? 1 / 9 : 2 / 9]}
                    ml={isRight ? "auto" : null}
                    textAlign={isRight ? "right" : null}
                  >
                    {label.desktop}
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
                <Column width={[2 / 9]}>{label.desktop}</Column>

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
                            color={
                              Math.sign(Math.round(difference)) === -1
                                ? "orange"
                                : null
                            }
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
      </Above>
      <Below breakpoint="desktop">
        {/* {headers && (
          <Row bg="gray2" py={[2, null, null, 2]} flexDirection="row">
            {headers.length > 0 &&
              headers.map((header, index) => {
                const { label, alignment } = header;
                const isRight = alignment === "right";
                return (
                  <Column
                    key={"header-" + index}
                    className={index}
                    width={[isRight ? 1 / 9 : 2 / 9]}
                    ml={isRight ? "auto" : null}
                    textAlign={isRight ? "right" : null}
                  >
                    {label.desktop}
                  </Column>
                );
              })}
          </Row>
        )} */}
        {rows &&
          rows.length > 0 &&
          rows.map((row, index) => {
            const { label, columns } = row;
            return (
              <React.Fragment>
                <Row
                  key={"row-mobile-" + index}
                  pt={4}
                  pb={2}
                  //   bg={index % 2 === 1 ? "gray2" : ""}
                  flexDirection="row"
                >
                  <Column width={[1]}>
                    <Label>{label.desktop}</Label>
                  </Column>
                </Row>
                {columns &&
                  columns.length > 0 &&
                  columns.map((column, index) => {
                    const { data, type, difference, alignment } = column;

                    return (
                      <Row
                        key={"row-column-mobile-" + index}
                        py={[2, null, null, 2]}
                        bg={index % 2 !== 1 ? "gray2" : ""}
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Column>
                          {headers &&
                            headers.length > 0 &&
                            headers[index + 1].label.mobile}
                        </Column>
                        <Column
                          key={"stat-mobile-" + index}
                          flexDirection="row"
                          justifyContent={"flex-end"}
                          textAlign={"right"}
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
                              pl={2}
                              color={
                                Math.sign(Math.round(difference)) === -1
                                  ? "orange"
                                  : null
                              }
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
                      </Row>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </Below>
    </React.Fragment>
  );
};

export default Stats;
