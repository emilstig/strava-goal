import React from "react";
import styled from "styled-components";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";
import { ButtonGroup, ButtonLabel } from "../UI/Button/Button";
import Text from "../UI/Typography/Text";
import { maleEmojis, femaleEmojis } from "../../helpers/emojis";

const activities = ["Run", "Ride", "Swim"];

const Wrapper = styled(Flex)`
  > div {
    ${({ theme }) => theme.mixins.transitionStandard()}
    opacity: ${props => (props.isVisible ? 1 : 0)};
  }
`;

const handleRadioButtonChange = (event, store, setStore) => {
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

const ActivityFilter = ({ store, setStore, isVisible, activityStats }) => {
  console.log("ActivityFilter -> activityStats", activityStats);
  const { athlete } = store;
  const emojis =
    athlete &&
    athlete.profile &&
    athlete.profile.gender &&
    athlete.profile.gender === "M"
      ? maleEmojis
      : femaleEmojis;
  return (
    <Wrapper
      flexDirection={("row", null, null, "column")}
      mr={["-16px", null, "0"]}
      ml={["-16px", null, "-16px"]}
      isVisible={isVisible ? 1 : null}
    >
      <Box width="100%">
        <ButtonGroup tabs={1}>
          {activities.map((activity, index) => {
            const label =
              activity === "Run"
                ? emojis.run
                : activity === "Ride"
                ? emojis.ride
                : emojis.swim;
            const isActive = store.activity === activity;
            // const activityStat = activityStats[activity.toLowerCase()];
            // const isDisabled =
            //   activityStat && activityStat.distance === 0 ? true : null;
            return (
              <ButtonLabel
                tab={1}
                key={`label-${index}`}
                // className={isDisabled ? "isDisabled" : ""}
                checked={isActive}
              >
                <input
                  //   disabled={isDisabled}
                  type="radio"
                  name="type"
                  id={activity}
                  value={activity}
                  autoComplete="off"
                  checked={isActive}
                  onChange={event =>
                    handleRadioButtonChange(event, store, setStore)
                  }
                />
                <Text as="span" role="img" aria-label="Emoji" fontSize="24px">
                  {label}
                </Text>
              </ButtonLabel>
            );
          })}
        </ButtonGroup>
      </Box>
    </Wrapper>
  );
};

export default ActivityFilter;
