import styled from "styled-components";
import Flex from "../Layout/Flex";
import Box from "../Layout/Box";

const borderRadius = "32px";
const padding = { mobile: "0 16px", desktop: "0 20px" };
const fontSize = { mobile: "16px", desktop: "18px" };
const height = {
  mobile: "42px",
  desktop: "52px",
  tabs: { mobile: "52px", desktop: "62px" }
};
const minWidth = "none";

export const Input = styled.input`
  ${({ theme }) => theme.mixins.resetButton}
  border-radius: ${borderRadius};
  background-color: ${({ theme }) => theme.colors.gray};
  width: 100%;
  height: ${height.mobile};
  font-size: ${fontSize.mobile};
  padding: ${padding.mobile};

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: ${height.desktop};
    font-size: ${fontSize.desktop};
    padding: ${padding.desktop};
  }
`;

export const ButtonGroup = styled(Flex)`
  width: 100%;
  align-items: center;
  height: ${props => (!props.tabs ? height.mobile : height.tabs.mobile)};

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: ${props => (!props.tabs ? height.desktop : height.tabs.desktop)};
  }

  label {
    border-radius: 0;

    &:first-of-type {
      border-radius: ${props =>
        !props.tabs ? `${borderRadius} 0 0 ${borderRadius}` : 0};
    }

    &:last-of-type {
      border-radius: ${props =>
        !props.tabs ? `0 ${borderRadius} ${borderRadius} 0` : 0};
    }
  }

  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`;

export const ButtonLabel = styled.label`
  ${({ theme }) => theme.mixins.resetButton}
  ${({ theme }) => theme.mixins.transitionStandard()}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => (!props.tab ? borderRadius : 0)};
  border: ${props =>
    !props.tab
      ? `1px
           solid ${props.theme.colors.white}`
      : `none`};
  text-decoration: none;
  background-color: ${props =>
    props.checked ? props.theme.colors.white : props.theme.colors.background};
  color: ${props =>
    props.checked ? props.theme.colors.black : props.theme.colors.white};
  width: 100%;
  min-width: ${minWidth};
  text-align: center;
  height: 100%;
  font-size: ${fontSize.mobile};
  padding: ${padding.mobile};
  padding-top: 2px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-size: ${fontSize.desktop};
    padding: ${padding.desktop};
    padding-top: 2px;

    &:hover {
      background-color: ${props =>
        props.checked
          ? props.theme.colors.white
          : props.theme.colors.grayLight};
    }
  }

  &::before {
    ${({ theme }) => theme.mixins.transitionStandard("all")}
    content: " ";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: calc(100% - 32px);
    background-color: ${props =>
      props.checked ? props.theme.colors.orange : "transparent"};
    height: 2px;
    transform: ${props =>
      props.checked
        ? "translateX(-50%) scale(1)"
        : "translateX(-50%) scale(0)"};

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      height: 2px;
    }
  }

  &.isDisabled {
    opacity: 0.54;

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      &:hover {
        background-color: transparent;
      }
    }
  }
`;

export const Button = styled(Box)`
  width: 100%;
  display: inline-block;
  height: ${height.mobile};

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: ${height.desktop};
  }

  button,
  a {
    ${({ theme }) => theme.mixins.resetButton}
    ${({ theme }) => theme.mixins.transitionStandard()}

    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    border-radius: ${borderRadius};
    background-size: 100% 100%;
    background-position: 50% 50%;
    text-decoration: none;
    background-color: ${props =>
      props.secondary ? props.theme.colors.gray : props.theme.colors.orange};
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    line-height: 1;
    width: 100%;
    height: 100%;
    font-size: ${fontSize.mobile};
    padding: ${props => (props.secondary ? 0 : padding.mobile)};

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      font-size: ${fontSize.desktop};
      padding: ${props => (props.secondary ? 0 : padding.desktop)};
    }

    &:active,
    &:focus {
      outline: none;
    }

    > * {
      transform: translateY(-2px);
    }
  }
`;
