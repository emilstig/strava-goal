import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Select from "../UI/Select/Select";
import Text from "../UI/Typography/Text";
import { SelectArrow } from "../UI/Icons/Icons";
import { maleEmojis, femaleEmojis } from "../../helpers/emojis";

const selectIconString = encodeURIComponent(
  renderToStaticMarkup(
    <SelectArrow width="32px" height="32px" color={"#000000"} />
  )
);
const selectIconUri = `url("data:image/svg+xml,${selectIconString}")`;
const selectIconStringMobile = encodeURIComponent(
  renderToStaticMarkup(
    <SelectArrow width="24px" height="24px" color={"#000000"} />
  )
);
const selectIconUriMobile = `url("data:image/svg+xml,${selectIconStringMobile}")`;

const activities = ["Run", "Ride", "Swim"];

const onSelectChange = (event, store, setStore) => {
  setStore({
    ...store,
    activity: event.target.value
  });

  // Save  settings to localstorage
  localStorage.setItem(
    "settings",
    JSON.stringify({
      goal: store.goal,
      activity: event.target.value
    })
  );
};

const ActivityPicker = ({ store, setStore }) => {
  const { athlete } = store;
  const emojis =
    athlete &&
    athlete.profile &&
    athlete.profile.gender &&
    athlete.profile.gender === "M"
      ? maleEmojis
      : femaleEmojis;

  return (
    <Select iconAfter={{ desktop: selectIconUri, mobile: selectIconUriMobile }}>
      <select onChange={event => onSelectChange(event, store, setStore)}>
        {activities.map((activity, index) => {
          const label =
            activity === "Run"
              ? emojis.run
              : activity === "Ride"
              ? emojis.ride
              : emojis.swim;
          const isActive = store.activity === activity;

          return (
            <option
              key={`activity-${index}`}
              checked={isActive}
              value={activity}
            >
              {`${label} ${activity}`}
            </option>
          );
        })}
      </select>
    </Select>
  );
};

export default ActivityPicker;
