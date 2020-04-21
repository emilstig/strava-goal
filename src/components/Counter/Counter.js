import React from "react";
import CountUp from "react-countup";

const Counter = ({ number, sign = false, value, onEnd, decimals = 0 }) => {
  const isNegative = Math.sign(number) === -1;
  const end = isNegative ? Math.abs(number) : number;

  const prefix = isNegative ? `-` : sign ? `+` : ``;
  const suffix = value ? ` ${value}` : ``;
  return end > 0 ? (
    <CountUp
      end={end}
      duration={1}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      onEnd={onEnd}
      useGrouping={false}
    />
  ) : (
    `0 ${value}`
  );
};

export default Counter;
