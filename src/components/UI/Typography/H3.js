import styled from "styled-components";
import Label from "./Label";

const H3 = styled(Label)``;

H3.defaultProps = {
  as: "h3",
  fontWeight: 500,
  my: 0,
  fontSize: ["14px", null, null, "16px"],
};

export default H3;
