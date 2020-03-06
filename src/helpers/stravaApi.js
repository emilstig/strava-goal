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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      grant_type: "refresh_token"
    })
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export const getAuthToken = async (client_id, client_secret, code) => {
  const url = `https://www.strava.com/oauth/token`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      grant_type: "authorization_code"
    })
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export const getAthlete = async token => {
  const url = `https://www.strava.com/api/v3/athlete`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json"
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export const getAthleteData = async (token, userId, yearTimestamp) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json"
  };
  const statsUrl = `https://www.strava.com/api/v3/athletes/${userId}/stats`;
  const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?per_page=100&after=${yearTimestamp}`;

  try {
    let [athleteStats, athleteActivities] = await Promise.all([
      fetch(statsUrl, options)
        .then(response =>
          response.text().then(text => (text ? JSON.parse(text) : {}))
        )
        .then(data => data),
      fetch(activitiesUrl, options)
        .then(response =>
          response.text().then(text => (text ? JSON.parse(text) : {}))
        )
        .then(data => data)
    ]);

    return { athleteStats, athleteActivities };
  } catch (err) {
    console.warn(err);
  }
};

// export const getAthleteStats = async (token, userId) => {
//   const url = `https://www.strava.com/api/v3/athletes/${userId}/stats`;

//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
//     contentType: "application/json"
//   };
//   let response = await fetch(url, options);
//   let data = await response.json();
//   return data;
// };

// export const getAthleteActivities = async token => {
//   const url = `https://www.strava.com/api/v3/athlete/activites`;

//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
//     contentType: "application/json"
//   };
//   let response = await fetch(url, options);
//   let data = await response.json();
//   return data;
// };
