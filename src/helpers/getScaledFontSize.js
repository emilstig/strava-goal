// fontSize = your default font size that it will scale from after minWidth (string with px)
// minWidth = breakpoint from where to calcualate the scaling (string with px)
// increase = integer of how fast it will scale after the minWidth (int)
export const getScaledFontSize = (fontSize, minWidth, increase) => {
  return `calc(${fontSize} - calc(${minWidth} / 100 * ${increase}) + ${increase}vw)`
}
