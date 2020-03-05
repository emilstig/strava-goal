import styled from "styled-components";
import Heading from "./Heading";
import { getScaledFontSize } from "../../../helpers/getScaledFontSize";

const H1 = styled(Heading)``;

H1.defaultProps = {
  as: "h1",
  lineHeight: "1.1",
  fontSize: [
    "46px",
    null,
    null,
    "100px",
    null,
    getScaledFontSize("100px", "1600px", 2)
  ],
  letterSpacing: "0px"
};

export default H1;
