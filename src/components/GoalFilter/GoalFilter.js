import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

// import { Input } from "../UI/Button/Button";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";

import Label from "../UI/Typography/Label";

const Wrapper = styled(Column)`
  opacity: ${props => (props.visibility ? 1 : 0)};
  pointer-events: ${props => (props.visibility ? "default" : "none")};
`;

// const handleInputChange = (event, store, setStore) => {
//   const goalDistance = parseInt(event.target.value);
//   const goalDistanceMin = parseInt(event.target.min);

//   if (
//     (goalDistance && goalDistanceMin && goalDistance >= goalDistanceMin) ||
//     (goalDistance && !goalDistanceMin && goalDistance >= 0)
//   ) {
//     setStore({
//       ...store,
//       goal: goalDistance
//     });

//     // Save  settings to localstorage
//     localStorage.setItem(
//       "settings",
//       JSON.stringify({
//         goal: goalDistance,
//         activity: store.activity
//       })
//     );
//   } else {
//     event.preventDefault();
//   }
// };

// const marks = [
//   {
//     value: 1250,
//     label: "1250 km"
//   },
//   {
//     value: 2500,
//     label: "2500 km"
//   },
//   {
//     value: 3750,
//     label: "3750 km"
//   }
// ];

const CustomSlider = withStyles({
  root: {
    color: "rgba(239, 70, 19, 1)"
  },

  rail: {
    background: "black"
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
    <Wrapper
      //   visibility={store.menu.option === "goal" ? true : null}
      visibility={1}
      width={1}
    >
      <Row>
        <Column width={1}>
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
            //   marks={marks}
          />
        </Column>
      </Row>
      <Row
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        pb={[2]}
      >
        <Column>
          <Label>Goal</Label>
        </Column>
        <Column>
          {store.goal} km
          {/* <Input
          type="number"
          min="100"
          max="5000"
          value={store.goal}
          onChange={event => handleInputChange(event, store, setStore)}
        /> */}
        </Column>
      </Row>
    </Wrapper>
  );
};

export default GoalFilter;
