# 🏃‍♀️Strava goals 🏃‍♂️

> A simple prototype that retrieves and presents a public Strava user's activities in relation to a yearly goal.

## 🚀 Setup project

1.  **Install the project.**

    ```sh
    yarn install
    ```

2.  **Setup your app.**

    To start developing with the Strava API, you will need to make an application to get the specific keys.

    1. If you have not already, go to https://www.strava.com/register and sign up for a Strava account
    2. After you are logged in, go to https://www.strava.com/settings/api and create an app
    3. You should see the “My API Application” page now. Keep it open and move on to the next step

3.  **Start the project.**

    Before starting up your project. Copy the .env.example into .env.development.local and replace the following variables with the ones from your newly created app page and your distance goal and activity type.

    `REACT_APP_STRAVA_CLIENT_ID`

    `REACT_APP_STRAVA_CLIENT_SECRET`

    `REACT_APP_GOAL_TYPE`

    `REACT_APP_GOAL_DISTANCE`

    ```sh
    yarn start
    ```

    Your site is now running at `http://localhost:3000`!

## 💫 Release History

- 0.1.2
  - Moved from static auth keys and user id to Strava login
  - Added new activity data
- 0.1.1
  - Added mobile styles
- 0.1.0
  - The first prototype

## Author

Emil Enestig – [@emilenestig](https://twitter.com/emilenestig)
