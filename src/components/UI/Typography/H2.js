import styled from "styled-components";
import Heading from "./Heading";
import { getScaledFontSize } from "../../../helpers/getScaledFontSize";

const H2 = styled(Heading)`
  margin: 0;
`;

H2.defaultProps = {
  as: "h2",
  lineHeight: "1.1",

  fontSize: [
    "36px",
    null,
    null,
    "56px",
    null,
    getScaledFontSize("56px", "1600px", 2)
  ]
};

export default H2;
