import styled from "styled-components";
import Text from "./Text";

const Label = styled(Text)``;

Label.defaultProps = {
  as: "span",
  lineHeight: "1",
  fontSize: ["16px", null, null, "18px"],
  letterSpacing: ["0em", null, null, "0em"],
};

export default Label;
