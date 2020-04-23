import React from "react";
import styled from "styled-components";

import Label from "../Typography/Label";
import Flex from "../Layout/Flex";

const width = "56px";
const height = "28px";
const knob = "24px";
const space = "2px";

const Wrapper = styled(Flex)`
  display: flex;
  align-items: center;

  .switch {
    cursor: pointer;
    display: inline-block;
    height: ${height};
    width: ${width};

    background: ${(props) =>
      props.checked
        ? props.theme.colors.orange
        : props.theme.colors.grayMedium};
    border-radius: ${height};

    .checkbox {
      position: absolute;
      opacity: 0;
    }

    .knob {
      transition: all 0.26s ease;
      height: ${knob};
      width: ${knob};
      border-radius: ${knob};
      background: #ffffff;
      transform: translate3d(${space}, ${space}, 0);
    }

    .checkbox:checked + .knob {
      transform: translate3d(calc(${width} - ${space} - ${knob}), ${space}, 0);
    }

  }

    .label {
      ${({ theme }) => theme.mixins.transitionStandard("color", "0.3s")}
      color: ${(props) =>
        props.checked
          ? props.theme.colors.black
          : props.theme.colors.grayDarkest};
    }
`;

const Switch = ({ name, label, onChange, checked = false }) => {
  return (
    <Wrapper alignItems="center" checked={checked}>
      {label && label.left && (
        <Label mr={1} className="label">
          {label.left}
        </Label>
      )}

      <label className="switch">
        <input
          type="checkbox"
          onChange={onChange}
          name={name}
          id={name}
          value={name}
          className="checkbox"
          checked={checked}
        />
        <div className="knob"></div>
      </label>
      {label && label.right && <Label className="label">{label.right}</Label>}
    </Wrapper>
  );
};

export default Switch;
