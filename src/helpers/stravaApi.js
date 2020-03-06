export const getToken = async (client_id, client_secret, refresh_token) => {
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

export const getAthleteStats = async (token, userId) => {
  const url = `https://www.strava.com/api/v3/athletes/${userId}/stats`;

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
