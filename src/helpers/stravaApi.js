export const getAuthToken = async (client_id, client_secret, code) => {
  const url = `https://www.strava.com/oauth/token`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      grant_type: "authorization_code",
    }),
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export const getRefreshToken = async (
  client_id,
  client_secret,
  refresh_token
) => {
  const url = `https://www.strava.com/oauth/token`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      grant_type: "refresh_token",
    }),
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export const getAthleteProfile = async (token) => {
  const url = `https://www.strava.com/api/v3/athlete`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export const getAthleteStats = async (token, userId, yearTimestamp) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
  };
  const url = `https://www.strava.com/api/v3/athletes/${userId}/stats`;

  try {
    let [athleteStats, athleteActivities] = await Promise.all([
      fetch(url, options)
        .then((response) =>
          response.text().then((text) => (text ? JSON.parse(text) : {}))
        )
        .then((data) => data),
      getAllYearActivities(1, options, yearTimestamp),
    ]);

    return { athleteStats, athleteActivities };
  } catch (err) {
    console.warn(err);
  }
};

const getActivities = async function (page = 1, options, yearTimestamp) {
  const url = `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=${page}&after=${yearTimestamp}`;
  var apiResults = await fetch(url, options)
    .then((response) =>
      response.text().then((text) => (text ? JSON.parse(text) : []))
    )
    .then((data) => {
      return data;
    });

  return apiResults;
};

const getAllYearActivities = async function (page = 1, options, yearTimestamp) {
  const results = await getActivities(page, options, yearTimestamp);

  if (results.length >= 100) {
    return results.concat(
      await getAllYearActivities(page + 1, options, yearTimestamp)
    );
  } else {
    return results;
  }
};
