import styled from "styled-components";

import {
  space,
  width,
  height,
  fontSize,
  color,
  flex,
  textAlign,
  alignSelf,
  lineHeight,
  display,
  borders,
  borderColor,
  position,
  borderRadius,
  minWidth,
  maxWidth,
  order,
  zIndex,
  left,
  right,
} from "styled-system";

const Box = styled.div`
  ${borders};
  ${borderColor};
  ${space};
  ${width};
  ${minWidth};
  ${maxWidth};
  ${height};
  ${fontSize};
  ${color};
  ${flex};
  ${order};
  ${textAlign};
  ${alignSelf};
  ${lineHeight};
  ${display};
  ${position};
  ${borderRadius};
  ${zIndex};
  ${left};
  ${right};
`;

Box.propTypes = {
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...minWidth.propTypes,
  ...maxWidth.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...textAlign.propTypes,
  ...alignSelf.propTypes,
  ...lineHeight.propTypes,
  ...display.propTypes,
  ...position.propTypes,
  ...borderRadius.propTypes,
  ...zIndex.propTypes,
  ...left.propTypes,
  ...right.propTypes,
};

export default Box;
