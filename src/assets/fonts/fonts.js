import { css } from "styled-components"

import ModeratRegularEot from "./Moderat-Regular.eot"
import ModeratRegularWoff from "./Moderat-Regular.woff"
import ModeratRegularWoff2 from "./Moderat-Regular.woff2"

export default css`
  @font-face {
    font-family: "Moderat";
    src: url(${ModeratRegularEot}) format("eot"),
      url(${ModeratRegularWoff}) format("woff"),
      url(${ModeratRegularWoff2}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }
`
