import styled from "styled-components";
import Text from "./Text";

const Heading = styled(Text)`
  font-weight: bold;
  ${props => props.theme.mixins.fontBedowTextHand}
  overflow-wrap: break-word;
  word-break: break-word;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    overflow-wrap: normal;
    word-break: normal;
  }
`;

export default Heading;
