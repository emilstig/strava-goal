import React from "react";

import { Tabs, Tab } from "../UI/Tabs/Tabs";

const tabs = [
  { label: "Current", value: "current" },
  { label: "Progress", value: "progress" },
  //   { label: "Stats", value: "stats" },
];

const handleOnChange = (event, store, setStore) => {
  setStore({
    ...store,
    tab: event.target.value,
  });
};

const ContentTabs = ({ store, setStore }) => {
  return (
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
  );
};

export default ContentTabs;
