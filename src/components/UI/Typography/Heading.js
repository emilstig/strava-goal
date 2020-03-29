import styled from "styled-components";
import Text from "./Text";

const Heading = styled(Text)`
  ${props => props.theme.mixins.fontBedowTextHand}
  overflow-wrap: break-word;
  word-break: break-word;
  font-weight: 600;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-weight: 600;
    overflow-wrap: normal;
    word-break: normal;
  }
`;

export default Heading;
