import styled from "styled-components";
import Text from "./Text";

const Label = styled(Text)`
  text-transform: uppercase;
`;

Label.defaultProps = {
  as: "span",
  lineHeight: "1",
  fontSize: ["12px", null, null, "13px"],
  letterSpacing: ["0.1em", null, null, "0.2em"],
  color: "grayDarkest",
};

export default Label;
