import styled from "styled-components";
import Flex from "../Flex";

const Row = styled(Flex)``;

Row.defaultProps = {
  mx: ["-8px", null, null, "-8px"],
  flexDirection: ["column", null, null, "row"],
  flexWrap: "wrap"
};

export default Row;
