import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getISOWeeksInYear, getWeeksInMonth, getWeek } from "date-fns";
import CountUp from "react-countup";

import "./App.css";
import getAthleteStats from "./helpers/getAthleteStats";
import fonts from "./assets/fonts/fonts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentWeek = getWeek(currentDate);
const totalWeeks = getISOWeeksInYear(currentDate);

const AppStyles = styled.header`
  ${fonts}
  * {
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }
`;

const Labels = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 16px;
`;

const Timeline = styled.div`
  display: flex;
  width: 100%;
  height: 52px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 0.2em;
    line-height: 1;

    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const ProgressBar = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;

  background: rgba(0, 0, 0, 0.05);

  div {
    position: relative;
    z-index: 4;
    color: rgba(0, 0, 0, 1);
    padding: 0 16px;
  }

  &::before {
    content: " ";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: width 1s cubic-bezier(0.86, 0, 0.07, 1);
    background-color: rgba(239, 70, 19, 1);
    width: ${props => props.progress}%;
  }

  &::after {
    content: " ";
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) ${props => props.goal}%,
      rgba(20, 20, 20, 1) ${props => props.goal}%,
      rgba(20, 20, 20, 1) calc(${props => props.goal}% + 2px),
      rgba(255, 255, 255, 0) calc(${props => props.goal}% + 2px),
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

function App() {
  const [athlete, setAthlete] = useState({});
  const token = "b4c9cc03cbe6348b237325cf06838a094552510b";
  const userId = "19649721";
  useEffect(() => {
    getAthleteStats(token, userId).then(data => {
      setAthlete(data);
    });
  }, []);
  const athleteStats = athlete?.ytd_run_totals;
  const runningGoalYear = 1000;
  const runningGoalDistance = (runningGoalYear / totalWeeks) * currentWeek;
  const runningTarget =
    (Math.round(runningGoalDistance) / runningGoalYear) * 100;
  const runningDistanceYear =
    athleteStats && athleteStats.distance
      ? Math.round(athleteStats.distance / runningGoalYear)
      : 0;
  const runningProgress = (runningDistanceYear / runningGoalYear) * 100;

  return (
    <div className="App">
      <AppStyles className="App-header">
        <h1>Running 2020</h1>
        <div>
          <Labels>
            <h2>Distance</h2>
            <h2>Goal</h2>
          </Labels>

          <ProgressBar progress={runningProgress} goal={runningTarget}>
            <div>
              {runningDistanceYear > 0 ? (
                <CountUp end={runningDistanceYear} duration={1} />
              ) : (
                "0"
              )}
              km
            </div>
            <div>{runningGoalYear} km</div>
          </ProgressBar>
          <Timeline>
            {months &&
              months.map((month, index) => {
                const monthWeeks = getWeeksInMonth(
                  new Date(currentYear, index, 1)
                );

                const weekDistance =
                  (runningGoalYear / totalWeeks) * monthWeeks;
                const weekWidth =
                  (Math.round(weekDistance) / runningGoalYear) * 100 + "%";

                return (
                  <div
                    key={"month-" + index}
                    style={{
                      opacity: index < currentMonth ? 0.5 : 1,
                      width: weekWidth
                    }}
                  >
                    {month.substring(0, 3)}
                  </div>
                );
              })}
          </Timeline>
        </div>
      </AppStyles>
    </div>
  );
}

export default App;
