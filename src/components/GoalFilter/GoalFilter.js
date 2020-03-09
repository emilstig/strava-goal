import React, { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// import { Input } from "../UI/Button/Button";
// import Label from "../UI/Typography/Label";
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

const CustomSlider = withStyles({
  root: {
    color: "rgba(239, 70, 19, 1)"
    // height: 6
  },
  //   thumb: {
  //     height: 24,
  //     width: 24,
  //     // backgroundColor: "#fff",
  //     border: "2px solid currentColor",
  //     marginTop: -8,
  //     marginLeft: -12,
  //     "&:focus,&:hover,&$active": {
  //       height: 54,
  //       width: 54
  //       //   boxShadow: "inherit"
  //     }
  //   },
  //   active: {},
  //   valueLabel: {
  //     left: "calc(-50% + 4px)"
  //   },
  //   track: {
  //     height: 6,
  //     borderRadius: 4
  //   },
  rail: {
    background: "black"
    // height: 6,
    // borderRadius: 4
  }
})(Slider);

const handleSliderChange = (event, value, setSliderValue) => {
  setSliderValue(value);
};

const handleSliderChangeComitted = (event, value, store, setStore) => {
  setStore({
    ...store,
    goal: value
  });

  // Save  settings to localstorage
  localStorage.setItem(
    "settings",
    JSON.stringify({
      goal: value,
      activity: store.activity
    })
  );
};

const GoalFilter = ({ store, setStore }) => {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setSliderValue(store.goal);
  }, [store.goal]);
  return (
    <Flex flexDirection={("row", null, null, "row")}>
      {/* <Box pr={[1, null, null, 2]}>
        <Label pl={[1, null, null, 1]}>Goal</Label>
      </Box> */}
      <Box width="100%">
        <CustomSlider
          min={100}
          max={5000}
          value={sliderValue}
          onChange={(event, value) =>
            handleSliderChange(event, value, setSliderValue)
          }
          valueLabelDisplay="auto"
          onChangeCommitted={(event, value) =>
            handleSliderChangeComitted(event, value, store, setStore)
          }
          step={10}
        />
        {/* <Input
          type="number"
          min="7"
          value={store.goal}
          onChange={event => handleInputChange(event, store, setStore)}
        /> */}
      </Box>
    </Flex>
  );
};

export default GoalFilter;
