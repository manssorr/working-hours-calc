import React from "react";
import { Line } from "rc-progress";
import colors from "../../assets/colors";

export default function LineProgress({
  percentageA = 10,
  percentageB = 20,
  percentageC = 50,
  title = "Title here",
  className = ""
}) {
  return (
    <div className={className}>
      <h1 className="text-xl font-bold font-serif">{title}</h1>
      <Line
        percent={[percentageA, percentageB, percentageC]}
        strokeWidth={4}
        strokeColor={[colors.classA, colors.classB, colors.classC]}
      />
    </div>
  );
}
