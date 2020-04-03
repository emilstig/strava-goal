import React from "react";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import { Tabs, Tab } from "../UI/Tabs/Tabs";

const ContentTabs = ({ store, setStore }) => {
  return (
    <Container
      bg="background"
      mr={["-16px", null, "0"]}
      ml={["-16px", null, "-16px"]}
    >
      <Row flexDirection="row">
        <Column width={[12 / 12, null, 3 / 12]}></Column>
        <Tabs>
          <Tab checked={true}>
            <input
              type="radio"
              name="type"
              value={"progress"}
              autoComplete="off"
              checked
              //   onChange={event =>
              //     handleRadioButtonChange(event, store, setStore)
              //   }
            />
            <span>Progress</span>
          </Tab>
          <Tab>
            <input
              type="radio"
              name="type"
              value={"stats"}
              autoComplete="off"
              //   checked={isActive}
              //   onChange={event =>
              //     handleRadioButtonChange(event, store, setStore)
              //   }
            />
            <span>Stats</span>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default ContentTabs;
