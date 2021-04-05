import styled from "styled-components";
import Flex from "../Layout/Flex";

const padding = { mobile: "0 16px", desktop: "0 20px" };
const fontSize = { mobile: "16px", desktop: "18px" };
const height = {
  mobile: "52px",
  desktop: "62px",
};

const minWidth = "none";
const maxWidth = "200px";

export const Tabs = styled(Flex)`
  width: 100%;
  align-items: center;
  height: ${height.mobile};
  background-color: ${(props) => props.theme.colors.gray200};

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    height: ${height.desktop};
  }

  label {
    border-radius: 0;

    &:first-of-type {
      border-radius: 0;
    }

    &:last-of-type {
      border-radius: 0;
    }
  }

  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`;

export const Tab = styled.label`
  ${({ theme }) => theme.mixins.resetButton}
  ${({ theme }) => theme.mixins.transitionStandard()}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  border: none;
  text-decoration: none;
  background-color: ${(props) =>
    props.checked ? props.theme.colors.gray50 : props.theme.colors.gray200};
  color: ${(props) =>
    props.checked ? props.theme.colors.gray900 : props.theme.colors.gray900};
  width: 100%;
  max-width: ${maxWidth};
  min-width: ${minWidth};
  text-align: center;
  height: 100%;
  font-size: ${fontSize.mobile};
  padding: ${padding.mobile};
  padding-top: 2px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: ${fontSize.desktop};
    padding: ${padding.desktop};
    padding-top: 2px;

    &:hover {
      background-color: ${(props) =>
        props.checked ? props.theme.colors.gray50 : props.theme.colors.gray100};
    }
  }

  &::before {
    ${({ theme }) => theme.mixins.transitionStandard("all")}
    content: " ";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: calc(100% - 32px);
    background-color: ${(props) =>
      props.checked ? props.theme.colors.orange : "transparent"};
    height: 2px;
    transform: ${(props) =>
      props.checked
        ? "translateX(-50%) scale(1)"
        : "translateX(-50%) scale(0)"};

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      height: 2px;
    }
  }

  &.isDisabled {
    opacity: 0.54;

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      &:hover {
        background-color: transparent;
      }
    }
  }
`;
