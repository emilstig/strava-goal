import styled from "styled-components";

import {
  space,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  fontSize,
  color,
  flex,
  textAlign,
  lineHeight,
  borders,
  borderColor,
  borderRadius,
  display,
  flexWrap,
  position,
  flexDirection,
  alignItems,
  justifyContent,
  zIndex,
  order
} from "styled-system";

const Flex = styled.div`
  display: flex;
  /* position: relative; */
  ${flexWrap};
  ${flexDirection};
  ${alignItems};
  ${justifyContent};
  ${flex};
  ${borders};
  ${order};
  ${space};
  ${width};
  ${minWidth};
  ${maxWidth};
  ${height};
  ${minHeight};
  ${fontSize};
  ${color};
  ${textAlign};
  ${lineHeight};
  ${borderColor};
  ${borderRadius};
  ${display};
  ${position};
  ${zIndex};
`;

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes,
  ...flex.propTypes,
  ...borders.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...minWidth.propTypes,
  ...maxWidth.propTypes,
  ...height.propTypes,
  ...minHeight.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...textAlign.propTypes,
  ...lineHeight.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...display.propTypes,
  ...position.propTypes,
  ...zIndex.propTypes,
  ...order.propTypes
};

export default Flex;
