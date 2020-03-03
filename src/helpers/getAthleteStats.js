const getAthleteStats = async (token, userId) => {
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

export default getAthleteStats;
