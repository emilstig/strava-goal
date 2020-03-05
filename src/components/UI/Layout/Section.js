import styled from "styled-components";
import Flex from "./Flex";

const Section = styled(Flex)``;

Section.defaultProps = {
  as: "section",
  px: [0, null, null, 0],
  flexDirection: "column",
  bg: "white"
};

export default Section;
