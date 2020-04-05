import styled from "styled-components";
import Text from "./Text";

const Label = styled(Text)`
  text-transform: uppercase;
`;

Label.defaultProps = {
  as: "span",
  lineHeight: "1",
  fontSize: ["14px", null, null, "16px"],
  letterSpacing: ["0.1em", null, null, "0.1em"],
  color: "grayDarkest",
};

export default Label;
