import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import { getWeek, getMonth, fromUnixTime } from "date-fns";

import Section from "./components/UI/Layout/Section";
import Container from "./components/UI/Layout/Grid/Container";
import Row from "./components/UI/Layout/Grid/Row";
import Column from "./components/UI/Layout/Grid/Column";
import Flex from "./components/UI/Layout/Flex";
import H1 from "./components/UI/Typography/H1";
// import H2 from "./components/UI/Typography/H2";
import H3 from "./components/UI/Typography/H3";

import Stats from "./components/Stats/Stats";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Timeline from "./components/Timeline/Timeline";

import "./App.css";
import theme from "./helpers/theme";
import { dummyData } from "./helpers/dummyData";
import {
  getAuthToken,
  //   getRefreshToken,
  getAthlete,
  getAthleteData
} from "./helpers/stravaApi";
// import clearWindowUrl from "./helpers/clearWindowUrl";
import {
  currentYearTimestamp,
  currentDay,
  currentWeek,
  currentMonth,
  totalDays,
  totalWeeks,
  totalMonths
} from "./helpers/getDates";
import fonts from "./assets/fonts/fonts";

// Strava API
const stravaApi = {
  clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
  clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  refreshToken: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
  userId: process.env.REACT_APP_STRAVA_USER_ID,
  type: "Run"
};

const scopes = ["read", "activity:read_all"];

const stravaAuthEndpoint = `http://www.strava.com/oauth/authorize?client_id=${
  stravaApi.clientId
}&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=${scopes.join(
  ","
)}`;

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

  &.View--step-2 {
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

function App() {
  const [token, setToken] = useState({
    accessToken: null,
    refreshToken: null,
    expiresAt: null
  });
  const [athlete, setAthlete] = useState({
    activities: [],
    stats: {},
    profile: {}
  });
  const [view, setView] = useState(0); // 1 = init, 2 = progress done, 3 = logged in

  useEffect(() => {
    // Check if token is available
    if (token && token.accessToken) {
      const nowDate = new Date();
      const expireDate =
        token && token.expiresAt ? fromUnixTime(token.expiresAt) : null;
      if (expireDate && nowDate < expireDate) {
        // TODO: Get athlete data
      } else {
        // TODO: Get refresh token
        // TODO: Get athlete data
      }
    } else {
      // Get window location
      const location = window && window.location ? window.location : null;

      // Get find search code parameter
      const urlParameters = location
        ? new URLSearchParams(window.location.search)
        : null;
      const authCode = urlParameters ? urlParameters.get("code") : null;

      // Clear window url
      // clearWindowUrl();

      // If has code
      if (authCode) {
        // Get oath
        getAuthToken(stravaApi.clientId, stravaApi.clientSecret, authCode).then(
          data => {
            const { access_token, refresh_token, expires_at } = data;
            if (access_token && refresh_token && expires_at) {
              // Get athlete
              getAthlete(access_token).then(data => {
                if (data) {
                  const { id, firstname, lastname, profile } = data;
                  // Get athlete stats and activities
                  getAthleteData(access_token, id, currentYearTimestamp).then(
                    data => {
                      const { athleteStats, athleteActivities } = data;
                      // Save athlete data
                      setAthlete({
                        activities: athleteActivities,
                        profile: {
                          id: id,
                          firstName: firstname,
                          lastName: lastname,
                          image: profile
                        },
                        stats: athleteStats
                      });
                      // Set view to init
                      setView(1);
                      // Save token data
                      setToken({
                        accessToken: access_token,
                        refreshToken: refresh_token,
                        expiresAt: expires_at
                      });
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  }, [token]);

  // Athlete data
  const statsYear = athlete?.stats?.ytd_run_totals;
  const activitiesCurrentYear = athlete?.activities.filter(
    activity => activity.type === stravaApi.type
  );
  //   const activitiesCurrentYear = dummyData.filter(
  //     activity => activity.type === stravaApi.type
  //   );
  console.log("App -> activitiesCurrentYear", activitiesCurrentYear);
  const activitiesCurrentMonth = activitiesCurrentYear
    ? activitiesCurrentYear.filter(activity => {
        const month = getMonth(new Date(activity.start_date));
        const type = activity.type;
        return month === currentMonth && type === stravaApi.type;
      })
    : null;
  const activitiesCurrentWeek = activitiesCurrentYear
    ? activitiesCurrentYear.filter(activity => {
        const week = getWeek(new Date(activity.start_date));
        const type = activity.type;
        return week === currentWeek && type === stravaApi.type;
      })
    : null;

  // Running goal
  const goalDistance = 1000;

  // Running year
  const yearDistanceGoal = Math.round((goalDistance / totalDays) * currentDay);
  const yearPercentageGoal = (yearDistanceGoal / goalDistance) * 100;
  const yearDistanceCurrent =
    statsYear && statsYear.distance ? Math.round(statsYear.distance) / 1000 : 0;
  const yearPercentageCurrent = (yearDistanceCurrent / goalDistance) * 100;
  const yearDistanceAverage = yearDistanceCurrent;
  const yearDifference = yearDistanceCurrent - yearDistanceGoal;
  //   const yearResult = (yearDistanceAverage / yearDistanceGoal) * 100;

  // Running month
  const monthDistanceCurrent = activitiesCurrentMonth
    ? Math.round(
        activitiesCurrentMonth.reduce(
          (sum, currentActivity) => sum + currentActivity.distance,
          0
        )
      ) / 1000
    : 0;

  const monthDistanceAverage = Math.round(yearDistanceCurrent / currentMonth);
  const monthDistanceGoal = Math.round(goalDistance / totalMonths);
  const monthDifference = monthDistanceCurrent - monthDistanceGoal;
  //   const monthResult = (monthDistanceAverage / monthDistanceGoal) * 100;

  // Running week
  const weekDistanceCurrent = activitiesCurrentWeek
    ? Math.round(
        activitiesCurrentWeek.reduce(
          (sum, currentActivity) => sum + currentActivity.distance,
          0
        )
      ) / 1000
    : 0;
  const weekDistanceAverage = Math.round(yearDistanceCurrent / currentWeek);
  const weekDistanceGoal = Math.round(goalDistance / totalWeeks);
  const weekDifference = weekDistanceCurrent - weekDistanceGoal;
  //   const weekResult = (weekDistanceAverage / weekDistanceGoal) * 100;

  const stats = [
    {
      label: "Year",
      distances: [yearDistanceCurrent, yearDistanceGoal, yearDifference],
      result: yearDistanceAverage
    },
    {
      label: "Week",
      distances: [weekDistanceCurrent, weekDistanceGoal, weekDifference],
      result: weekDistanceAverage
    },
    {
      label: "Month",
      distances: [monthDistanceCurrent, monthDistanceGoal, monthDifference],
      result: monthDistanceAverage
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className={view && "View View--step-" + view}>
        <Helmet>
          <title>Strava goals</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Description" />
        </Helmet>
        <Top className="Top" pt={2}>
          <Container>
            <Row>
              <Column
                width={[6 / 6, null, null, 12 / 12]}
                mb={[2, null, null, 4]}
              >
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <H1>Running Goals</H1>
                  {!token.accessToken ? (
                    <a href={stravaAuthEndpoint} targe="_self">
                      Login and get status
                    </a>
                  ) : (
                    "Logged in"
                  )}
                </Flex>
              </Column>
              <Column width={[6 / 6, null, null, 12 / 12]}>
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <H3>Status</H3>
                  {/* <H3>Results</H3> */}
                </Flex>
              </Column>
            </Row>
            <Row bg="gray2" py={[2, null, null, 2]} flexDirection="row">
              <Column width={[3 / 12, null, null, 2 / 12]}></Column>
              <Column width={[3 / 12, null, null, 2 / 12]}>Current</Column>
              <Column width={[3 / 12, null, null, 2 / 12]}>Goal</Column>
              <Column width={[3 / 12, null, null, 2 / 12]}>Difference</Column>
              {/* <Column
                width={[3 / 12, null, null, 2 / 12]}
                ml="auto"
                textAlign="right"
              >
                Current
              </Column> */}
              <Column
                width={[3 / 12, null, null, 2 / 12]}
                ml="auto"
                textAlign="right"
              >
                Average
              </Column>
            </Row>
            <Stats stats={stats} view={view} />
          </Container>
        </Top>
        <Bottom className="Bottom">
          <Container>
            <Row justifyContent="space-between" flexDirection="row">
              <Column>
                <H3>Progress</H3>
              </Column>
              <Column>
                <H3>Goal</H3>
              </Column>
            </Row>
          </Container>

          <ProgressBar
            data={{
              yearPercentageCurrent,
              yearPercentageGoal,
              yearDistanceCurrent,
              goalDistance
            }}
            view={view}
            onEnd={() => {
              setView(2);
            }}
          />
          <Timeline data={{ goalDistance }} />
        </Bottom>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
