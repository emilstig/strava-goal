import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import {
  getDaysInYear,
  getISOWeeksInYear,
  getDaysInMonth,
  getWeek,
  getDayOfYear
} from "date-fns";
import CountUp from "react-countup";

import Section from "./components/UI/Layout/Section";
import Container from "./components/UI/Layout/Grid/Container";
import Row from "./components/UI/Layout/Grid/Row";
import Column from "./components/UI/Layout/Grid/Column";
import Flex from "./components/UI/Layout/Flex";
import Box from "./components/UI/Layout/Box";
import H1 from "./components/UI/Typography/H1";
import H2 from "./components/UI/Typography/H2";
import H3 from "./components/UI/Typography/H3";
import Label from "./components/UI/Typography/Label";
import Counter from "./components/Counter/Counter";

import "./App.css";
// import { getPercentageChange } from "./helpers/getPercentage";
import theme from "./helpers/theme";
import getAthleteStats from "./helpers/getAthleteStats";
import getStravaToken from "./helpers/getStravaToken";
import fonts from "./assets/fonts/fonts";

// Strava API
const stravaApi = {
  clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
  clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  refreshToken: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
  userId: process.env.REACT_APP_STRAVA_USER_ID
};

// Dates
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentWeek = getWeek(currentDate);
const currentDay = getDayOfYear(currentDate);
const totalDays = getDaysInYear(currentDate);
const totalWeeks = getISOWeeksInYear(currentDate);
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
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-size: 26px;
  }

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
  transform: translateY(26px);

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    transform: translateY(52px);
  }
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`;

const Timeline = styled(Box)`
  display: flex;
  width: 100%;
  height: 26px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: 52px;
  }

  .Month {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray1};
    }

    .Month__desktop {
      display: none;

      @media (min-width: ${props => props.theme.breakpoints[2]}) {
        display: inline-block;
      }
    }
    .Month__mobile {
      display: inline-block;

      @media (min-width: ${props => props.theme.breakpoints[2]}) {
        display: none;
      }
    }
  }
`;

const ProgressBar = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray2};
  height: 54px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: 63px;
  }

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
    height: calc(100% + 6px);
    left: ${props => props.goal}%;
    top: -3px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: scale(0);
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  }
`;

function App() {
  const [athlete, setAthlete] = useState({});
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    // Get refresh token
    getStravaToken(
      stravaApi.clientId,
      stravaApi.clientSecret,
      stravaApi.refreshToken
    ).then(data => {
      if (data.access_token) {
        // Get user stats from Strava
        getAthleteStats(data.access_token, stravaApi.userId).then(data => {
          setAthlete(data);
        });
      }
    });
  }, []);

  // Athlete data
  const statsYear = athlete?.ytd_run_totals;

  // Running goals
  const goalDistance = 1000;

  // Running year
  const goalYearDistance = Math.round((goalDistance / totalDays) * currentDay);
  const goalYearPercentage = (goalYearDistance / goalDistance) * 100;
  const yearDistance =
    statsYear && statsYear.distance ? Math.round(statsYear.distance) / 1000 : 0;
  const yearPercentage = (yearDistance / goalDistance) * 100;
  const yearResult = (yearDistance / goalYearDistance) * 100;

  // Running month
  const goalMonthDistance = Math.round(goalDistance / totalMonths);
  const monthDistance = Math.round(yearDistance / currentMonth);
  const monthResult = (monthDistance / goalMonthDistance) * 100;

  // Running week
  const goalWeekDistance = Math.round(goalDistance / totalWeeks);
  const weekDistance = Math.round(yearDistance / currentWeek);
  const weekResult = (weekDistance / goalWeekDistance) * 100;

  const stats = [
    {
      label: "Yearly",
      distances: [yearDistance, goalYearDistance],
      result: yearResult
    },
    {
      label: "Monthly",
      distances: [monthDistance, goalMonthDistance],
      result: monthResult
    },
    {
      label: "Weekly",
      distances: [weekDistance, goalWeekDistance],
      result: weekResult
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className={animation && "animation-step-" + animation}>
        <Helmet>
          <title>Strava goals</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Description" />
        </Helmet>
        <Top className="Top" pt={2} px={1}>
          <Container>
            <Row>
              <Column
                width={[6 / 6, null, null, 12 / 12]}
                mb={[2, null, null, 4]}
              >
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <H1> Yearly Goal </H1>
                  <H2 as="p">{currentYear}</H2>
                </Flex>
              </Column>
              <Column width={[6 / 6, null, null, 12 / 12]}>
                <H3>Status</H3>
              </Column>
            </Row>
            <Row bg="gray2" py={[2, null, null, 2]} flexDirection="row">
              <Column width={[3 / 12, null, null, 2 / 12]}></Column>
              <Column width={[3 / 12, null, null, 2 / 12]}>Current</Column>
              <Column width={[3 / 12, null, null, 2 / 12]}>Target</Column>
              <Column
                width={[3 / 12, null, null, 2 / 12]}
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
                        width={[3 / 12, null, null, 2 / 12]}
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
            <H3>Progress</H3>
            <H3>Goal</H3>
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
          <Timeline className="Timeline" color="gray">
            {months &&
              months.map((month, index) => {
                const monthDays = getDaysInMonth(new Date(currentYear, index));
                const monthDistance = (goalDistance / totalDays) * monthDays;
                const monthWidth =
                  (Math.round(monthDistance) / goalDistance) * 100 + "%";

                return (
                  <div
                    className="Month"
                    key={"month-" + index}
                    style={{
                      opacity: index < currentMonth ? 0.5 : 1,
                      width: monthWidth
                    }}
                  >
                    <Label className="Month__desktop">
                      {month.substring(0, 3)}
                    </Label>
                    <Label className="Month__mobile">
                      {month.substring(0, 1)}
                    </Label>
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
