import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fromUnixTime } from "date-fns";
import Section from "../../components/UI/Layout/Section";
import Flex from "../../components/UI/Layout/Flex";

import ViewCurrent from "./View/ViewCurrent";
import ViewProgress from "./View/ViewProgress";
import ViewStats from "./View/ViewStats";

import Header from "../../components/Header/Header";
import ContentTabs from "../../components/ContentTabs/ContentTabs";

import fonts from "../../assets/fonts/fonts";
import getStats from "../../helpers/getStats";
import getAthleteData from "../../helpers/getAthleteData";
import { getAuthToken, getRefreshToken } from "../../helpers/stravaApi";
import { currentYear } from "../../helpers/getDates";

// Strava API
const stravaApi = {
  clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
  clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_STRAVA_REDIRECT_URI,
  metaTitle: process.env.REACT_APP_META_TITLE,
  metaDescription: process.env.REACT_APP_META_DESCRIPTION,
};

const scopes = ["read", "activity:read_all"];

const stravaAuthEndpoint = `http://www.strava.com/oauth/authorize?client_id=${
  stravaApi.clientId
}&response_type=code&redirect_uri=${
  stravaApi.redirectUri
}&approval_prompt=force&scope=${scopes.join(",")}`;

const Wrapper = styled(Flex)`
  ${fonts}

  overflow: hidden;
  min-height: 100vh;
  min-height: -webkit-fill-available;

  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: 26px;
  }

  * {
    box-sizing: border-box;
  }
`;

const Content = styled(Section)`
  flex: 1;
`;

function PageHome() {
  const [store, setStore] = useState({
    token: {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    },
    athlete: { activities: [], profile: {} },
    goal: 1000,
    activity: "Run",
    tab: "current",
    menu: { open: false, active: false, option: "user" },
  });
  console.log("🚀 ~ file: Home.js ~ line 63 ~ PageHome ~ store", store);

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
          localSettings
        );
      } else {
        getRefreshToken(
          stravaApi.clientId,
          stravaApi.clientSecret,
          refreshToken
        ).then((data) => {
          if (data) {
            const { access_token, refresh_token, expires_at } = data;
            getAthleteData(
              access_token,
              refresh_token,
              expires_at,
              setStore,
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
          (data) => {
            const { access_token, refresh_token, expires_at } = data;
            if (access_token && refresh_token && expires_at) {
              // Get data
              getAthleteData(
                access_token,
                refresh_token,
                expires_at,
                setStore,
                localSettings
              );
            }
          }
        );
      }
    }
  }, []);

  const { athlete, goal, tab } = store;

  // Current activities
  const yearActivities =
    athlete && athlete.activities && athlete.activities.length > 0
      ? athlete.activities.filter(
          (activity) => activity.type === store.activity
        )
      : [];

  return (
    <Wrapper
      flexDirection="column"
      justifyContent={["flex-start", null, null, "flex-start"]}
      bg="gray300"
    >
      <Helmet>
        <title>{`${stravaApi.metaTitle} — ${currentYear}`}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={stravaApi.metaDescription} />
      </Helmet>
      <Header
        store={store}
        setStore={setStore}
        stravaAuthEndpoint={stravaAuthEndpoint}
      />

      <Content
        className="Content"
        flexDirection="column"
        marginX={[2, null, null, 4]}
      >
        <ContentTabs store={store} setStore={setStore} />
        {tab === "current" && (
          <ViewCurrent
            stats={getStats({
              goal,
              yearActivities,
            })}
          />
        )}
        {tab === "progress" && (
          <ViewProgress
            stats={getStats({
              goal,
              yearActivities,
            })}
          />
        )}
        {tab === "stats" && (
          <ViewStats
            stats={getStats({
              goal,
              yearActivities,
            })}
          />
        )}
      </Content>
    </Wrapper>
  );
}

export default PageHome;
