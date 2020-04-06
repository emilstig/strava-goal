import styled from "styled-components";
import Label from "./Label";

const H3 = styled(Label)``;

H3.defaultProps = {
  as: "h3",
  fontWeight: 500,
  pt: [3, null, null, 4],
  pb: [2, null, null, 3],
  my: 0,
};

export default H3;
