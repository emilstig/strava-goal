import React from "react";
// import styled from "styled-components";

import { Input, Button, ButtonGroup, ButtonLabel } from "../UI/Button/Button";
import Text from "../UI/Typography/Text";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Label from "../UI/Typography/Label";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";
import { maleEmojis, femaleEmojis } from "../../helpers/emojis";

const handleTypeChange = (event, types, setTypes) => {
  setTypes({ ...types, active: event.target.value });
};

const Login = ({ link, goalType }) => {
  const { types, setTypes } = goalType;
  return (
    <React.Fragment>
      <Row alignItems="flex-end" justifyContent="flex-end">
        <Column width={[12 / 12, null, 6 / 12, 4 / 12]} mb={[1, null, null, 1]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 2]} mb={[0, null, null, 1]}>
              <Label pl={[1, null, null, 1]}>Set activity</Label>
            </Box>
            <Box width="100%">
              <ButtonGroup>
                {types.items.map((item, index) => {
                  const value = item;
                  const label =
                    value === "Run"
                      ? femaleEmojis.run
                      : value === "Ride"
                      ? maleEmojis.ride
                      : femaleEmojis.swim;
                  const isActive = types.active === value;
                  return (
                    <ButtonLabel
                      key={`label-${index}`}
                      className="primary"
                      checked={isActive}
                    >
                      <input
                        type="radio"
                        name="type"
                        id={value}
                        value={value}
                        autoComplete="off"
                        checked={isActive}
                        onChange={event =>
                          handleTypeChange(event, types, setTypes)
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
        {/* <Column width={[12 / 12, null, 6 / 12, 4 / 12]} mb={[1, null, null, 1]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 2]} mb={[0, null, null, 1]}>
              <Label pl={[1, null, null, 1]}>Goal</Label>
            </Box>
            <Box width="100%">
              <Input type="number" value="1000" />
            </Box>
          </Flex>
        </Column> */}
      </Row>
      <Row justifyContent="flex-end">
        <Column width={[12 / 12, null, 6 / 12, 4 / 12]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 1]} mb={[0, null, null, 1]}>
              {/* <Label pl={[1, null, null, 1]}>Login</Label> */}
            </Box>
            <Box width="100%">
              <Button type="number">
                <a href={link} targe="_self">
                  <span>Login with Strava</span>
                </a>
              </Button>
            </Box>
          </Flex>
        </Column>
      </Row>
    </React.Fragment>
  );
};

export default Login;
