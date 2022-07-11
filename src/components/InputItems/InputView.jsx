import React, { useEffect, useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputView({ title, val, unit, isInt = false }) {
  console.log("🚀 ~ val", val);

  const valToView = isInt ? parseInt(val) : parseFloat(val).toFixed(2);

  return (
    <>
      <InputGroup
        className="grid grid-cols-2 m-1"
        style={{
          minWidth: "150px",
          maxWidth: "170px",
          minHeight: "55px"
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
          {valToView} {unit}
        </span>
      </InputGroup>
    </>
  );
}
