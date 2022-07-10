import React, { useEffect, useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputMaxMin({
  title,
  name,
  val,
  onChange,
  max,
  min,
  isDisabled = false
}) {
  const [value, setValue] = useState(val);

  const handleChangeMaxMin = (e) => {
    const oldValue = value;
    const newValue = e.target.value;
    const isIncrement = newValue > oldValue;
    const isDecrement = newValue < oldValue;

    const isPositive = newValue >= 0;
    const outOfRange = newValue > max;

    if (isDecrement && !isPositive) {
      alert("Can't be less than 0");
    } else if (isIncrement && outOfRange) {
      alert("Can't be more than " + max);
    } else {
      onChange(name, value, title);
      setValue(e.target.value);
    }
  };

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
        <Input
          disabled={isDisabled}
          className="text-center"
          type="number"
          value={value}
          onChange={handleChangeMaxMin}
          placeholder="10"
        />
      </InputGroup>
    </>
  );
}
