import styled from "styled-components";
import Label from "./Label";

const H3 = styled(Label)``;

H3.defaultProps = {
  as: "h3",
  fontWeight: 500,
  my: 0,
};

export default H3;
