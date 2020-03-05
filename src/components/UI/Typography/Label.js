import styled from "styled-components";
import Text from "./Text";

const Label = styled(Text)`
  text-transform: uppercase;
`;

Label.defaultProps = {
  as: "span",
  lineHeight: "1",
  fontSize: ["12px", null, null, "16px"],
  textAlign: "center",
  letterSpacing: "0.2em"
};

export default Label;
