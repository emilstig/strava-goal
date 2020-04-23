import styled from "styled-components";
import Flex from "../Flex";

const Column = styled(Flex)``;

Column.defaultProps = {
  flexDirection: "column",
  px: ["8px", null, null, "8px"],
};

export default Column;
