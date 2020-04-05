import styled from "styled-components";
import Box from "../Layout/Box";

const Select = styled(Box)`
  position: relative;
  width: auto;
  padding: 0;

  select {
    width: auto;
    border: none;
    background: none;
    appearance: none;
    margin: 0;
    margin-left: -1px;
    line-height: 1.5em;
    border-radius: 0;
    padding: ${(props) =>
      props.type === "top" ? "16px 24px 0 16px" : "16px 24px 16px 24px"};

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      padding: ${(props) =>
        props.type === "top" ? "16px 24px 0 24px" : "16px 24px 16px 24px"};
    }

    option {
      color: black;
    }

    ::placeholder {
      color: ${(props) => props.theme.colors.grayDark};
      opacity: 1; /* Firefox */
      transition: opacity ease 0.26s;
    }

    :-ms-input-placeholder {
      color: ${(props) => props.theme.colors.grayDark};
    }

    ::-ms-input-placeholder {
      color: ${(props) => props.theme.colors.grayDark};
    }

    :focus {
      outline: none;

      ::placeholder {
        color: ${(props) => props.theme.colors.black};
        opacity: 0.84; /* Firefox */
      }

      :-ms-input-placeholder {
        color: ${(props) => props.theme.colors.black};
        opacity: 0.84;
      }

      ::-ms-input-placeholder {
        color: ${(props) => props.theme.colors.black};
        opacity: 0.84;
      }
    }
  }

  &::before {
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    content: ${({ iconBefore }) => (iconBefore ? iconBefore.mobile : "")};

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      content: ${({ iconBefore }) => (iconBefore ? iconBefore.desktop : "")};
    }
  }

  &::after {
    pointer-events: none;
    position: absolute;
    right: -7px;
    top: ${(props) => (props.type === "top" ? "50%" : "50%")};
    transform: ${(props) =>
      props.type === "top" ? `translateY(-25%)` : `translateY(-50%)`};
    content: ${({ iconAfter }) => (iconAfter ? iconAfter.mobile : "")};

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      content: ${({ iconAfter }) => (iconAfter ? iconAfter.desktop : "")};
    }
  }
`;

export default Select;
