import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  getISOWeeksInYear,
  getWeeksInMonth,
  getDaysInYear,
  getWeek,
  getDayOfYear
} from "date-fns";
import CountUp from "react-countup";

import Section from "./components/UI/Layout/Section";
import Container from "./components/UI/Layout/Grid/Container";
import Row from "./components/UI/Layout/Grid/Row";
import Column from "./components/UI/Layout/Grid/Column";
import Counter from "./components/Counter/Counter";

import "./App.css";
import { getPercentageChange } from "./helpers/getPercentage";
import theme from "./helpers/theme";
import getAthleteStats from "./helpers/getAthleteStats";
import fonts from "./assets/fonts/fonts";

// Strava API
const token = "887c05f83d4a47e611752569dcbbbbb0c2daf7ca";
const userId = "19649721";

// Dates
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentWeek = getWeek(currentDate);
const currentDay = getDayOfYear(currentDate);
const totalWeeks = getISOWeeksInYear(currentDate);
const totalDays = getDaysInYear(currentDate);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const totalMonths = months.length;

const Wrapper = styled.div`
  ${fonts}
  * {
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }
  overflow: hidden;
  font-family: "Moderat", Helvetica, Arial, sans-serif;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 26px;
  color: ${({ theme }) => theme.colors.black};

  &.animation-step-1 {
    .Bottom {
      transform: translateY(0px);
      &:hover {
        .ProgressBar {
          &::after {
            /* transform: scale(1.1); */
          }
        }
      }
    }
    .ProgressBar {
      &::after {
        transform: scale(1);
      }
    }
  }
`;

const Top = styled(Section)``;

const Bottom = styled(Section)`
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  transform: translateY(52px);
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`;

const Timeline = styled.div`
  display: flex;
  width: 100%;
  height: 52px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 0.2em;
    line-height: 1;

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray1};
    }
  }
`;

const ProgressBar = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 63px;
  background-color: ${({ theme }) => theme.colors.gray2};

  div {
    position: relative;
    z-index: 4;
    padding: 0 16px;
  }

  &::before {
    content: " ";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: width 1s cubic-bezier(0.86, 0, 0.07, 1);
    background-color: ${({ theme }) => theme.colors.orange};
    width: ${props => props.progress}%;
  }

  &::after {
    content: " ";
    position: absolute;
    z-index: 3;
    width: 2px;
    /* height: 0; */
    height: calc(100% + 6px);
    left: ${props => props.goal}%;
    top: -3px;
    background-color: ${({ theme }) => theme.colors.black};
    /* transform: translateY(100%); */
    transform: scale(0);
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  }
`;

function App() {
  const [athlete, setAthlete] = useState({});
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    // Get user stats from Strava
    getAthleteStats(token, userId).then(data => {
      setAthlete(data);
    });
  }, []);

  // Athlete data
  const statsYear = athlete?.ytd_run_totals;

  // Running goals
  const goalDistance = 1000;

  // Running year
  const goalYearDistance = (goalDistance / totalWeeks) * currentWeek;
  const goalYearPercentage = (goalYearDistance / goalDistance) * 100;
  const yearDistance =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  const yearPercentage = (yearDistance / goalDistance) * 100;
  //   const yearResult = (yearDistance / goalYearDistance) * 100;

  // Running day
  const goalDayDistance = (goalDistance / totalDays) * currentDay;
  const dayResult = (yearDistance / goalDayDistance) * 100;

  // Running month
  const goalMonthDistance = goalDistance / totalMonths;
  //   const goalMonthPercentage = (goalMonthDistance / goalDistance) * 100;
  const monthDistance = yearDistance / currentMonth;
  //   const monthPercentage = (monthDistance / goalDistance) * 100;
  const monthResult = (monthDistance / goalMonthDistance) * 100;

  // Running week
  const goalWeekDistance = goalDistance / totalWeeks;
  //   const goalWeekPercentage = (goalWeekDistance / goalDistance) * 100;
  const weekDistance = yearDistance / currentWeek;
  //   const weekPercentage = (weekDistance / goalDistance) * 100;
  const weekResult = (weekDistance / goalWeekDistance) * 100;

  const stats = [
    {
      label: "Daily",
      distances: [goalDayDistance, yearDistance],
      result: dayResult
    },
    {
      label: "Weekly",
      distances: [goalWeekDistance, weekDistance],
      result: weekResult
    },
    {
      label: "Monthly",
      distances: [goalMonthDistance, monthDistance],
      result: monthResult
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className={animation && "animation-step-" + animation}>
        <Top className="Top" pt={2} px={1}>
          <Container>
            <Row>
              <Column
                width={[6 / 6, null, null, 12 / 12]}
                mb={[2, null, null, 4]}
              >
                <h1>Running 2020</h1>
              </Column>
              <Column width={[6 / 6, null, null, 12 / 12]}>
                <h2>Status</h2>
              </Column>
            </Row>
            <Row bg="gray2" py={[1, null, null, 2]}>
              <Column width={[6 / 6, null, null, 2 / 12]}></Column>
              <Column width={[6 / 6, null, null, 2 / 12]}>Goal</Column>
              <Column width={[6 / 6, null, null, 2 / 12]}>Current</Column>
              <Column
                width={[6 / 6, null, null, 2 / 12]}
                ml="auto"
                textAlign="right"
              >
                Result
              </Column>
            </Row>
            {stats &&
              stats.length > 0 &&
              stats.map((stat, index) => {
                const { label, distances, result } = stat;
                return (
                  <Row key={"stats-" + index} py={[1, null, null, 2]}>
                    <Column width={[6 / 6, null, null, 2 / 12]}>
                      {label && label}
                    </Column>

                    {distances &&
                      distances.length > 0 &&
                      distances.map((distance, index) => {
                        return (
                          <Column width={[6 / 6, null, null, 2 / 12]}>
                            {animation ? (
                              <Counter number={distance} value="km" />
                            ) : (
                              "0 km"
                            )}
                          </Column>
                        );
                      })}

                    {result && (
                      <Column
                        width={[6 / 6, null, null, 2 / 12]}
                        ml="auto"
                        textAlign="right"
                      >
                        {animation ? (
                          <Counter number={result} value="%" />
                        ) : (
                          "0 %"
                        )}
                      </Column>
                    )}
                  </Row>
                );
              })}
          </Container>
        </Top>

        <Bottom className="Bottom">
          <Labels>
            <h2>Progress</h2>
            <h2>Goal</h2>
          </Labels>
          <ProgressBar
            className="ProgressBar"
            progress={yearPercentage}
            goal={goalYearPercentage}
          >
            <div>
              {yearDistance > 0 ? (
                <CountUp
                  end={yearDistance}
                  duration={1}
                  onEnd={() => {
                    setAnimation(1);
                  }}
                />
              ) : (
                "0"
              )}
              km
            </div>
            <div>
              <CountUp end={goalDistance} duration={1} />
              km
            </div>
          </ProgressBar>
          <Timeline className="Timeline">
            {months &&
              months.map((month, index) => {
                const monthWeeks = getWeeksInMonth(
                  new Date(currentYear, index, 1)
                );
                const weekDistance = (goalDistance / totalWeeks) * monthWeeks;
                const weekWidth =
                  (Math.round(weekDistance) / totalWeeks) * 100 + "%";

                return (
                  <div
                    key={"month-" + index}
                    style={{
                      opacity: index < currentMonth ? 0.5 : 1,
                      width: weekWidth
                    }}
                  >
                    {month.substring(0, 3)}
                  </div>
                );
              })}
          </Timeline>
        </Bottom>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
