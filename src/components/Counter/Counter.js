import React from "react";
import CountUp from "react-countup";

const Counter = ({ number, value, onEnd }) => {
  const isNegative = Math.sign(number) === -1;
  const end = isNegative ? Math.abs(number) : number;

  const prefix = isNegative ? `-` : ``;
  return end > 0 ? (
    <CountUp
      end={end}
      duration={1}
      prefix={prefix}
      suffix={` ${value}`}
      decimals={0}
      onEnd={onEnd}
    />
  ) : (
    `0 ${value}`
  );
};

export default Counter;
