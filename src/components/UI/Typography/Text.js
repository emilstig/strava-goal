import styled from "styled-components"

import {
  space,
  fontSize,
  color,
  textAlign,
  lineHeight,
  fontWeight,
  fontStyle,
  letterSpacing,
  fontFamily,
  width,
} from "styled-system"

const Text = styled.span`
  ${space};
  ${width};
  ${fontSize};
  ${color};
  ${textAlign};
  ${lineHeight};
  ${fontWeight};
  ${letterSpacing};
  ${fontFamily};
  ${fontStyle};
`

Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...textAlign.propTypes,
  ...lineHeight.propTypes,
  ...fontWeight.propTypes,
  ...letterSpacing.propTypes,
  ...fontFamily.propTypes,
  ...width.propTypes,
  ...fontStyle.propTypes,
}

export default Text
