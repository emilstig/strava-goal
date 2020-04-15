import React from "react";
import styled from "styled-components";

const Button = styled.button`
  ${({ theme }) => theme.mixins.transitionStandard("background", "0.3s")}
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;

  &:hover,
  &.active {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray};

    svg {
      fill: ${({ theme }) => theme.colors.black};
    }
  }

  svg {
    ${({ theme }) => theme.mixins.transitionStandard("fill", "0.3s")}
    width: 20px;
    height: 20px;
    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      width: 24px;
      height: 24px;
    }
  }
`;

const IconButton = ({ onClick, children, className }) => {
  return (
    <Button
      onClick={() => (onClick ? onClick() : () => null)}
      className={className}
    >
      {children}
    </Button>
  );
};

export default IconButton;
