import styled from "styled-components";
import Heading from "./Heading";
import Label from "./Label";
import { getScaledFontSize } from "../../../helpers/getScaledFontSize";

const H3 = styled(Label)``;

H3.defaultProps = {
  as: "h3",
  fontWeight: 500,
  pt: [3, null, null, 4],
  pb: [2, null, null, 3],
  my: 0,
};

export default H3;
