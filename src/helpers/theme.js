const theme = {
  breakpoints: ["576px", "768px", "992px", "1280px", "1600px"],
  colors: {
    black: "rgba(20,20,20,1)",
    white: "rgba(255,255,255,1)",
    background: "rgba(239,239,239,1)",
    grayDarkest: "rgba(20,20,20,0.64)",
    grayDark: "rgba(20,20,20,0.54)",
    grayMedium: "rgba(20,20,20,0.24)",
    grayNew: "rgba(20,20,20,0.1)",
    gray: "rgba(20,20,20,0.06)",
    grayLight: "rgba(20,20,20,0.02)",
    orange: "rgba(239, 70, 19, 1)",
    green: "#2ead83",
  },
  space: {
    0: "0px",
    1: "8px",
    2: "16px",
    3: "24px",
    4: "32px",
    5: "40px",
    6: "48px",
    7: "56px",
    8: "64px",
    9: "72px",
    10: "80px",
    11: "88px",
    12: "96px",
  },
  fontSizes: {
    0: "11px",
    1: "12px",
    2: "14px",
    3: "16px",
    4: "18px",
    5: "24px",
    6: "32px",
    7: "48px",
    8: "60px",
    9: "91px",
  },
  mixins: {
    imageObjectFit: (position = "center") => `
      object-fit: cover;
      object-position: ${position};
      `,
    positionCover: () => `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `,
    overlay: (color = "rgba(0,0,0,0.2)") => `
      content: "";
      background-color: ${color};
      `,
    textElipsis: () => `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      `,
    resetButton: () => `
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      font-family: inherit;
      cursor: pointer;
      `,
    transitionStandard: (
      property = "all",
      timing = "0.22s",
      easing = "cubic-bezier(0.42, 0, 0.35, 1)",
      delay = "0s"
    ) => `
      transition: ${property} ${timing} ${easing} ${delay};
      `,
    transitionSnappy: (
      property = "all",
      timing = "0.3s",
      easing = "cubic-bezier(0.86, 0, 0.07, 1)",
      delay = "0s"
    ) => `
      transition: ${property} ${timing} ${easing} ${delay};
      `,
  },
};

export default theme;
