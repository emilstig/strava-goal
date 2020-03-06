import styled from "styled-components";
import Flex from "../Flex";

const Container = styled(Flex)``;

Container.defaultProps = {
  width: 12 / 12,
  flexDirection: "column",
  px: ["16px", null, null, "16px"],
  mx: "auto"
};

export default Container;
