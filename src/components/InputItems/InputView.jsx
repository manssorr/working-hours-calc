import React, { useEffect, useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputView({ title, val, unit }) {
  console.log("🚀 ~ val", val);

  return (
    <>
      <InputGroup
        className="grid grid-cols-2 m-1"
        style={{
          minWidth: "150px",
          maxWidth: "170px"
        }}
      >
        <span
          style={{
            minWidth: "fit-content"
          }}
          className="text-2x6 text-center font-san"
        >
          {title}
        </span>
        <span
          style={{
            minWidth: "fit-content"
          }}
          className="text-2x6 text-center font-san"
        >
          {val} {unit}
        </span>
      </InputGroup>
    </>
  );
}
