export const getPercentageChange = (oldNumber, newNumber) => {
  var decreaseValue =
    oldNumber > newNumber ? oldNumber - newNumber : newNumber - oldNumber;

  return (decreaseValue / oldNumber) * 100;
};
