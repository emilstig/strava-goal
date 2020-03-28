import React from "react";
import CountUp from "react-countup";

const Counter = ({ number, sign = false, value, onEnd }) => {
  const roundedNumber = Math.round(number);
  const isNegative = Math.sign(roundedNumber) === -1;
  const end = isNegative ? Math.abs(roundedNumber) : roundedNumber;

  const prefix = isNegative ? `-` : sign ? `+` : ``;
  const suffix = value ? ` ${value}` : ``;
  return end > 0 ? (
    <CountUp
      end={end}
      duration={1}
      prefix={prefix}
      suffix={suffix}
      decimals={0}
      onEnd={onEnd}
      useGrouping={false}
    />
  ) : (
    `0 ${value}`
  );
};

export default Counter;
