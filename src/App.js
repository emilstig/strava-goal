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
import H3 from "./components/UI/Typography/H3";

import Login from "./components/Login/Login";
import LoggedIn from "./components/LoggedIn/LoggedIn";
import Stats from "./components/Stats/Stats";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Timeline from "./components/Timeline/Timeline";

import "./App.css";
import theme from "./helpers/theme";

import {
  getAuthToken,
  getRefreshToken,
  getAthleteProfile,
  getAthleteStats
} from "./helpers/stravaApi";
// import clearWindowUrl from "./helpers/clearWindowUrl";
import {
  currentYear,
  currentYearTimestamp,
  dayOfYear,
  currentWeek,
  currentMonth,
  dayOfWeek,
  dayOfMonth,
  totalDaysOfYear,
  totalDaysOfMonth
} from "./helpers/getDates";
import fonts from "./assets/fonts/fonts";

// Strava API
const stravaApi = {
  clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
  clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_STRAVA_REDIRECT_URI,
  goalType: process.env.REACT_APP_GOAL_TYPE,
  goalDistance: parseInt(process.env.REACT_APP_GOAL_DISTANCE)
};

const scopes = ["read", "activity:read_all"];

const stravaAuthEndpoint = `http://www.strava.com/oauth/authorize?client_id=${
  stravaApi.clientId
}&response_type=code&redirect_uri=${
  stravaApi.redirectUri
}&approval_prompt=force&scope=${scopes.join(",")}`;

const Wrapper = styled.div`
  ${fonts}

  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  min-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-size: 26px;
  }

  * {
    box-sizing: border-box;
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
  const [store, setStore] = useState({
    token: {
      accessToken: null,
      refreshToken: null,
      expiresAt: null
    },
    athlete: { activities: [], stats: {}, profile: {} },
    goal: 1000,
    activity: "Run"
  });
  const [view, setView] = useState(0);
  const { token, athlete } = store;

  useEffect(() => {
    // Check if token is available
    const localToken = JSON.parse(window.localStorage.getItem("token"));

    if (localToken && localToken.accessToken) {
      const { accessToken, refreshToken, expiresAt } = localToken;
      const nowDate = new Date();
      const expireDate = expiresAt ? fromUnixTime(expiresAt) : null;

      if (expireDate && nowDate < expireDate) {
        getAthleteData(accessToken, refreshToken, expiresAt, setStore);
      } else {
        getRefreshToken(
          stravaApi.clientId,
          stravaApi.clientSecret,
          refreshToken
        ).then(data => {
          if (data) {
            const { access_token, refresh_token, expires_at } = data;
            getAthleteData(access_token, refresh_token, expires_at, setStore);
          }
        });
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
              // Get data
              getAthleteData(access_token, refresh_token, expires_at, setStore);
            }
          }
        );
      }
    }

    function getAthleteData(access_token, refresh_token, expires_at, setStore) {
      // Get athlete data
      getAthleteProfile(access_token).then(data => {
        if (data) {
          const { id, firstname, lastname, profile, sex } = data;
          // Get athlete stats and activities
          getAthleteStats(access_token, id, currentYearTimestamp).then(data => {
            const { athleteStats, athleteActivities } = data;
            // Save  token to localstorage
            localStorage.setItem(
              "token",
              JSON.stringify({
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresAt: expires_at
              })
            );
            // Save  data to store

            setStore({
              token: {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresAt: expires_at
              },
              athlete: {
                activities: athleteActivities,
                profile: {
                  id: id,
                  firstName: firstname,
                  lastName: lastname,
                  gender: sex,
                  image: profile
                },
                stats: athleteStats
              },
              view: 1,
              goal: 1000,
              activity: "Run"
            });
            setView(1);
          });
        }
      });
    }
  }, []);

  // Athlete data
  const hasStats = athlete && athlete.stats ? true : null;
  const statsYear =
    hasStats && store.activity === "Run"
      ? athlete.stats.ytd_run_totals
      : hasStats && store.activity === "Ride"
      ? athlete.stats.ytd_ride_totals
      : athlete.stats.ytd_swim_totals;

  const activitiesCurrentYear =
    athlete && athlete.activities && athlete.activities.length > 0
      ? athlete.activities.filter(activity => activity.type === store.activity)
      : [];
  const activitiesCurrentMonth = activitiesCurrentYear
    ? activitiesCurrentYear.filter(
        activity => getMonth(new Date(activity.start_date)) === currentMonth
      )
    : null;
  const activitiesCurrentWeek = activitiesCurrentYear
    ? activitiesCurrentYear.filter(
        activity => getWeek(new Date(activity.start_date)) === currentWeek
      )
    : null;

  // Goal distance
  const goalDistance = store.goal;
  const dayDistanceGoal = goalDistance / totalDaysOfYear;

  // Year distance
  const yearDistanceCurrent =
    statsYear && statsYear.distance ? statsYear.distance / 1000 : 0;
  const yearDistanceRemaining = goalDistance - yearDistanceCurrent;
  const yearDaysRemaining = totalDaysOfYear - dayOfYear;
  const yearDistanceExpected = dayDistanceGoal * (dayOfYear + 1);
  const yearDistanceExpectedDifference =
    yearDistanceCurrent - yearDistanceExpected;

  // Month distance
  const monthDistanceCurrent = activitiesCurrentMonth
    ? activitiesCurrentMonth.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const monthDistanceRemaining =
    dayDistanceGoal * totalDaysOfMonth - monthDistanceCurrent;
  const monthDaysRemaining = totalDaysOfMonth - dayOfMonth;
  const monthDistanceExpected = dayDistanceGoal * (dayOfMonth + 1);
  const monthDistanceExpectedDifference =
    monthDistanceCurrent - monthDistanceExpected;

  // Week distance
  const weekDistanceCurrent = activitiesCurrentWeek
    ? activitiesCurrentWeek.reduce(
        (sum, currentActivity) => sum + currentActivity.distance,
        0
      ) / 1000
    : 0;
  const weekDistanceLeft = dayDistanceGoal * 7 - weekDistanceCurrent;
  const weekDaysLeft = 7 - dayOfWeek;
  const weekDistanceExpected = dayDistanceGoal * (dayOfWeek + 1);
  const weekDistanceExpectedDifference =
    weekDistanceCurrent - weekDistanceExpected;

  // Progress
  const yearPercentageGoal = (yearDistanceExpected / goalDistance) * 100;
  const yearPercentageCurrent = (yearDistanceCurrent / goalDistance) * 100;
  const stats = {
    current: {
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
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className={view && "View View--step-" + view}>
        <Helmet>
          <title>{`Annual Goal — ${currentYear}`}</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Follow your progress on Strava in relation to your annual goal."
          />
        </Helmet>
        <Top className="Top" pt={2}>
          <Container>
            <Row>
              <Column
                width={[6 / 6, null, null, 12 / 12]}
                mb={[4, null, null, 4]}
              >
                <Row
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Column mb={[12, null, null, 2]}>
                    <H1>{currentYear}</H1>
                  </Column>
                  <Column width={[8 / 12, null, null, 6 / 12]}>
                    {!token.accessToken && (
                      <Login loginLink={stravaAuthEndpoint} />
                    )}
                    {token.accessToken && (
                      <LoggedIn store={store} setStore={setStore} />
                    )}
                  </Column>
                </Row>
              </Column>
              <Column width={[6 / 6, null, null, 12 / 12]}>
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <H3>Current</H3>
                </Flex>
              </Column>
            </Row>
            <Stats stats={stats} view={view} />
          </Container>
        </Top>
        <Bottom className="Bottom" mt={4}>
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
