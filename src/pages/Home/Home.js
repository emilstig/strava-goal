import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { getWeek, getMonth, fromUnixTime } from "date-fns";

import { Button } from "../../components/UI/Button/Button";
import Section from "../../components/UI/Layout/Section";
import Container from "../../components/UI/Layout/Grid/Container";
import Row from "../../components/UI/Layout/Grid/Row";
import Column from "../../components/UI/Layout/Grid/Column";

import H1 from "../../components/UI/Typography/H1";
import H3 from "../../components/UI/Typography/H3";

import Login from "../../components/Login/Login";
import Profile from "../../components/Profile/Profile";
import GoalFilter from "../../components/GoalFilter/GoalFilter";
import Stats from "../../components/Stats/Stats";
import ActivityFilter from "../../components/ActivityFilter/ActivityFilter";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Timeline from "../../components/Timeline/Timeline";
import fonts from "../../assets/fonts/fonts";
import getStats from "../../helpers/getStats";
import getAthleteData from "../../helpers/getAthleteData";
import { getAuthToken, getRefreshToken } from "../../helpers/stravaApi";
import { currentYear, currentWeek, currentMonth } from "../../helpers/getDates";

// Strava API
const stravaApi = {
  clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
  clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_STRAVA_REDIRECT_URI,
  metaTitle: process.env.REACT_APP_META_TITLE,
  metaDescription: process.env.REACT_APP_META_DESCRIPTION
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
  ${({ theme }) => theme.mixins.transitionSnappy("transform", "0.8s")}
  transform: translateY(26px);

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    transform: translateY(52px);
  }
`;

function PageHome() {
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
  const { token, athlete, goal } = store;

  useEffect(() => {
    // Check if token is available
    const localToken = JSON.parse(localStorage.getItem("token"));
    const localSettings = JSON.parse(localStorage.getItem("settings"));

    if (localToken && localToken.accessToken) {
      const { accessToken, refreshToken, expiresAt } = localToken;
      const nowDate = new Date();
      const expireDate = expiresAt ? fromUnixTime(expiresAt) : null;

      if (expireDate && nowDate < expireDate) {
        getAthleteData(
          accessToken,
          refreshToken,
          expiresAt,
          setStore,
          setView,
          localSettings
        );
      } else {
        getRefreshToken(
          stravaApi.clientId,
          stravaApi.clientSecret,
          refreshToken
        ).then(data => {
          if (data) {
            const { access_token, refresh_token, expires_at } = data;
            getAthleteData(
              access_token,
              refresh_token,
              expires_at,
              setStore,
              setView,
              localSettings
            );
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
              getAthleteData(
                access_token,
                refresh_token,
                expires_at,
                setStore,
                setView,
                localSettings
              );
            }
          }
        );
      }
    }
  }, []);

  // Set and filter activity data
  const hasStats = athlete && athlete.stats ? true : null;
  const activityStats = {
    run: hasStats ? athlete.stats.ytd_run_totals : 0,
    ride: hasStats ? athlete.stats.ytd_ride_totals : 0,
    swim: hasStats ? athlete.stats.ytd_swim_totals : 0
  };
  const statsYear =
    store.activity === "Run"
      ? activityStats.run
      : store.activity === "Ride"
      ? activityStats.ride
      : activityStats.swim;

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

  return (
    <Wrapper className={view && "View View--step-" + view}>
      <Helmet>
        <title>{`${stravaApi.metaTitle} — ${currentYear}`}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={stravaApi.metaDescription} />
      </Helmet>
      <Top className="Top">
        <Container bg="offWhite" pt={2} pb={[4, null, null, 4]}>
          <Row
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Column width={[2 / 6, null, null, 6 / 12]}>
              <H1>{currentYear}</H1>
            </Column>
            <Column width={[4 / 6, null, null, 6 / 12]} pt={[2, null, null, 3]}>
              {!token.accessToken ? (
                <Login loginLink={stravaAuthEndpoint} />
              ) : (
                <Profile profile={athlete.profile} />
              )}
            </Column>
          </Row>
        </Container>
        <Container bg="offWhite">
          <GoalFilter store={store} setStore={setStore} />
        </Container>
        <Container bg="offWhite">
          <Row flexDirection="row">
            <Column width={[12 / 12, null, 3 / 12]}>
              <ActivityFilter
                store={store}
                setStore={setStore}
                activityStats={activityStats}
                isVisible={token.accessToken}
              />
            </Column>
          </Row>
        </Container>
        <Container>
          <Row flexDirection="row">
            <Column width={[12 / 12, null, 6 / 12]}>
              <H3 mb={[2, null, 2]} mt={[2, null, 2]}>
                Current
              </H3>
            </Column>
          </Row>
        </Container>
        <Container>
          <Stats
            stats={getStats(
              goal,
              statsYear,
              activitiesCurrentMonth,
              activitiesCurrentWeek
            )}
            view={view}
          />
        </Container>
      </Top>
      <Bottom className="Bottom" mt={4}>
        <Container>
          <Row justifyContent="space-between" flexDirection="row">
            <Column>
              <H3>Progress</H3>
            </Column>

            <Column>
              {/* <Button type="number" secondary>
                <a href={"/"} targe="_self">
                  <span>Set goal +</span>
                </a>
              </Button> */}
              {/* <H3>Goal</H3> */}
            </Column>
          </Row>
        </Container>

        <ProgressBar
          stats={getStats(
            goal,
            statsYear,
            activitiesCurrentMonth,
            activitiesCurrentWeek
          )}
          goal={goal}
          view={view}
          onEnd={() => {
            setView(2);
          }}
        />
        <Timeline goal={goal} />
      </Bottom>
    </Wrapper>
  );
}

export default PageHome;
