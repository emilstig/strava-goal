import React from "react";

import { Input, Button, ButtonGroup, ButtonLabel } from "../UI/Button/Button";
import Text from "../UI/Typography/Text";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Label from "../UI/Typography/Label";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";
import { maleEmojis, femaleEmojis } from "../../helpers/emojis";

const activities = ["Run", "Ride", "Swim"];

const handleRadioButtonChange = (event, store, setStore) => {
  setStore({ ...store, activity: event.target.value });
};

const handleInputChange = (event, store, setStore) => {
  setStore({ ...store, goal: parseInt(event.target.value) });
};

const LoggedIn = ({ store, setStore }) => {
  return (
    <React.Fragment>
      <Row alignItems="flex-end" justifyContent="flex-end">
        <Column width={[12 / 12, null, 6 / 12, 4 / 12]} mb={[1, null, null, 1]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 2]} mb={[0, null, null, 1]}>
              <Label pl={[1, null, null, 1]}>Activity</Label>
            </Box>
            <Box width="100%">
              <ButtonGroup>
                {activities.map((activity, index) => {
                  const label =
                    activity === "Run"
                      ? femaleEmojis.run
                      : activity === "Ride"
                      ? maleEmojis.ride
                      : femaleEmojis.swim;
                  const isActive = store.activity === activity;
                  return (
                    <ButtonLabel
                      key={`label-${index}`}
                      className="primary"
                      checked={isActive}
                    >
                      <input
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
                      <Text
                        as="span"
                        role="img"
                        aria-label="Emoji"
                        fontSize="24px"
                      >
                        {label}
                      </Text>
                    </ButtonLabel>
                  );
                })}
              </ButtonGroup>
            </Box>
          </Flex>
        </Column>
        <Column width={[12 / 12, null, 6 / 12, 4 / 12]} mb={[1, null, null, 1]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 2]} mb={[0, null, null, 1]}>
              <Label pl={[1, null, null, 1]}>Goal</Label>
            </Box>
            <Box width="100%">
              <Input
                type="number"
                value={store.goal}
                onChange={event => handleInputChange(event, store, setStore)}
              />
            </Box>
          </Flex>
        </Column>
      </Row>
    </React.Fragment>
  );
};

export default LoggedIn;
