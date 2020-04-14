import { getAthleteProfile, getAthleteStats } from "./stravaApi";
import { currentYearTimestamp } from "./getDates";

const getAthleteData = (
  access_token,
  refresh_token,
  expires_at,
  setStore,
  localSettings
) => {
  // Get athlete data
  getAthleteProfile(access_token).then((data) => {
    if (data) {
      const { id, firstname, lastname, profile, sex } = data;
      // Get athlete stats and activities
      getAthleteStats(access_token, id, currentYearTimestamp).then((data) => {
        const { athleteStats, athleteActivities } = data;
        // Save  token to localstorage
        localStorage.setItem(
          "token",
          JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt: expires_at,
          })
        );

        // Save  data to store
        setStore({
          token: {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt: expires_at,
          },
          athlete: {
            activities: athleteActivities,
            stats: athleteStats,
            profile: {
              id: id,
              firstName: firstname,
              lastName: lastname,
              gender: sex,
              image: profile,
            },
          },
          goal: localSettings ? localSettings.goal : 1000,
          activity: localSettings ? localSettings.activity : "Run",
          tab: "pace",
          menu: { open: false, active: false, option: "user" },
        });
      });
    }
  });
};

export default getAthleteData;
