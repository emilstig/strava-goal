import React from "react";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Box from "../UI/Layout/Box";
import { Tabs, Tab } from "../UI/Tabs/Tabs";

const tabs = [
  { label: "Progress", value: "progress" },
  { label: "Stats", value: "stats" },
];

const handleOnChange = (event, store, setStore) => {
  setStore({
    ...store,
    tab: event.target.value,
  });

  // Save  settings to localstorage
  //   localStorage.setItem(
  //     "settings",
  //     JSON.stringify({
  //       goal: store.goal,
  //       activity: event.target.value
  //     })
  //   );
};

const ContentTabs = ({ store, setStore }) => {
  return (
    <Container bg="background">
      <Box mr={["-16px", null, "0"]} ml={["-16px", null, "-16px"]}>
        <Row flexDirection="row">
          <Column width={[12 / 12, null, 3 / 12]}></Column>
          <Tabs>
            {tabs &&
              tabs.length > 0 &&
              tabs.map((tab, index) => (
                <Tab
                  key={"tab-" + index}
                  checked={store.tab === tab.value ? true : false}
                >
                  <input
                    type="radio"
                    name="content"
                    value={tab.value}
                    autoComplete="off"
                    checked={store.tab === tab.value ? true : false}
                    onChange={(event) => handleOnChange(event, store, setStore)}
                  />
                  <span>{tab.label}</span>
                </Tab>
              ))}
          </Tabs>
        </Row>
      </Box>
    </Container>
  );
};

export default ContentTabs;
