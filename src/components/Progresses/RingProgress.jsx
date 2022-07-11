import React from "react";
import { Circle } from "rc-progress";

export default function RingProgress({
  percent = 10,
  color = "red",
  title = "progressss"
}) {
  return (
    <div
      style={{
        minWidth: "max-content",
        width: "30%"
      }}
      className=" m-2 flex flex-col border-2 p-2 border-solid border-gray-500 rounded-lg justify-between items-center"
    >
      <p
        style={{
          width: "max-content"
        }}
        className="text-xl font-serif mb-2"
      >
        {title} - {percent}%
      </p>
      <Circle
        style={{
          width: "145px"
        }}
        percent={percent}
        strokeWidth={13}
        strokeLinecap="round"
        strokeColor={color}
        trailWidth={5}
      />
    </div>
  );
}
