import styled from "styled-components";
import Heading from "./Heading";
import { getScaledFontSize } from "../../../helpers/getScaledFontSize";

const H3 = styled(Heading)``;

H3.defaultProps = {
  as: "h3",
  lineHeight: "1.1",
  mt: 0,
  mb: 2,
  fontSize: [
    "24px",
    null,
    null,
    "46px",
    null,
    getScaledFontSize("46px", "1600px", 2)
  ],
  letterSpacing: ["-0.005em", null, null, "0em"]
};

export default H3;
