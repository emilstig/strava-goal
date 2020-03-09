import React from "react";

import { Input } from "../UI/Button/Button";

import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Label from "../UI/Typography/Label";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";

const handleInputChange = (event, store, setStore) => {
  const goalDistance = parseInt(event.target.value);
  const goalDistanceMin = parseInt(event.target.min);

  if (
    (goalDistance && goalDistanceMin && goalDistance >= goalDistanceMin) ||
    (goalDistance && !goalDistanceMin && goalDistance >= 0)
  ) {
    setStore({
      ...store,
      goal: goalDistance
    });

    // Save  settings to localstorage
    localStorage.setItem(
      "settings",
      JSON.stringify({
        goal: goalDistance,
        activity: store.activity
      })
    );
  } else {
    event.preventDefault();
  }
};

const LoggedIn = ({ store, setStore }) => {
  return (
    <React.Fragment>
      <Row alignItems="flex-end" justifyContent="flex-end">
        <Column width={[12 / 12, null, 6 / 12, 4 / 12]} mb={[0, null, null, 0]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 2]} mb={[1, null, null, 1]}>
              <Label pl={[1, null, null, 1]}>Goal</Label>
            </Box>
            <Box width="100%">
              <Input
                type="number"
                min="7"
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
