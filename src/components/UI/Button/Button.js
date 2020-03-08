import styled from "styled-components";
import Flex from "../Layout/Flex";
import Box from "../Layout/Box";

const borderRadius = "32px";
const padding = { mobile: "0 16px", desktop: "0 20px" };
const fontSize = { mobile: "16px", desktop: "18px" };
const height = { mobile: "42px", desktop: "52px" };
const minWidth = "none";

export const Input = styled.input`
  ${({ theme }) => theme.mixins.resetButton}
  border-radius: ${borderRadius};
  background-color: ${({ theme }) => theme.colors.gray1};
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
  height: ${height.mobile};

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    height: ${height.desktop};
  }

  label {
    border-radius: 0;

    &:first-of-type {
      border-radius: ${borderRadius} 0 0 ${borderRadius};
    }

    &:last-of-type {
      border-radius: 0 ${borderRadius} ${borderRadius} 0;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius};
  border: 1px solid ${props => props.theme.colors.white};
  text-decoration: none;
  background-color: ${props =>
    props.checked ? props.theme.colors.orange : props.theme.colors.gray1};
  color: ${props =>
    props.checked ? props.theme.colors.black : props.theme.colors.white};
  width: 100%;
  min-width: ${minWidth};
  text-align: center;
  transition: all 0.6s ease-in-out;
  height: 100%;
  font-size: ${fontSize.mobile};
  padding: ${padding.mobile};

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-size: ${fontSize.desktop};
    padding: ${padding.desktop};

    &:hover {
      background-color: ${props => props.theme.colors.orange};
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
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    border-radius: ${borderRadius};
    background-size: 100% 100%;
    background-position: 50% 50%;
    transition: background-position 1s ease;
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    line-height: 1;
    width: 100%;
    height: 100%;
    font-size: ${fontSize.mobile};
    padding: ${padding.mobile};

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      font-size: ${fontSize.desktop};
      padding: ${padding.desktop};
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
