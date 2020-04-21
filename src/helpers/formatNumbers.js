export const roundedToFixed = (float, digits) => {
  var rounded = Math.pow(10, digits);
  return parseFloat((Math.round(float * rounded) / rounded).toFixed(digits));
};
