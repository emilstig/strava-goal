import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getISOWeeksInYear, getWeeksInMonth, getWeek } from "date-fns";
import CountUp from "react-countup";

import "./App.css";
import getAthleteStats from "./helpers/getAthleteStats";
import fonts from "./assets/fonts/fonts";

// Strava API
const token = "b4c9cc03cbe6348b237325cf06838a094552510b";
const userId = "19649721";

// Dates
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentWeek = getWeek(currentDate);
const totalWeeks = getISOWeeksInYear(currentDate);
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

const Wrapper = styled.div`
  ${fonts}
  * {
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }
  overflow: hidden;
  font-family: "Moderat", Helvetica, Arial, sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: #000000;

  &.animation-step-1 {
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

const Top = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`;

const Bottom = styled.footer`
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  transform: translateY(52px);
  &:hover {
    /* transform: translateY(0px); */
  }
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
    width: 2px;
    /* height: 0; */
    height: calc(100% + 6px);
    left: ${props => props.goal}%;
    top: -3px;
    background-color: rgba(20, 20, 20, 1);
    /* transform: translateY(100%); */
    transform: scale(0);
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  }
`;

function App() {
  const [athlete, setAthlete] = useState({});
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    // Get user stats from Strava
    getAthleteStats(token, userId).then(data => {
      setAthlete(data);
    });
  }, []);

  // Athlete data
  const athleteStats = athlete?.ytd_run_totals;

  // Running goal
  const goalDistance = 1000;
  const goalCurrentDistance = (goalDistance / totalWeeks) * currentWeek;
  const goalCurrentPercentage =
    (Math.round(goalCurrentDistance) / goalDistance) * 100;

  // Running current
  const currentDistance =
    athleteStats && athleteStats.distance
      ? Math.round(athleteStats.distance / goalDistance)
      : 0;
  const currentPercentage = (currentDistance / goalDistance) * 100;
  return (
    <Wrapper className={animation && "animation-step-" + animation}>
      <Top className="Top">
        <h1>Running 2020</h1>
      </Top>

      <Bottom className="Bottom">
        <Labels>
          <h2>Distance</h2>
          <h2>Goal</h2>
        </Labels>

        <ProgressBar
          className="ProgressBar"
          progress={currentPercentage}
          goal={goalCurrentPercentage}
        >
          <div>
            {currentDistance > 0 ? (
              <CountUp
                end={currentDistance}
                duration={1}
                onEnd={() => {
                  setAnimation(1);
                }}
              />
            ) : (
              "0"
            )}
            km
          </div>
          <div>
            <CountUp end={goalDistance} duration={1} />
            km
          </div>
        </ProgressBar>
        <Timeline className="Timeline">
          {months &&
            months.map((month, index) => {
              const monthWeeks = getWeeksInMonth(
                new Date(currentYear, index, 1)
              );
              const weekDistance = (goalDistance / totalWeeks) * monthWeeks;
              const weekWidth =
                (Math.round(weekDistance) / totalWeeks) * 100 + "%";

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
      </Bottom>
    </Wrapper>
  );
}

export default App;
