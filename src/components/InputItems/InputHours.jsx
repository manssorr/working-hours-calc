import React, { useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputHours({ title, name, val, onChange, total, max, isDisabled = false }) {

  const [value, setValue] = useState(val);

  const handleChangeConditional = (e) => {
    const oldValue = value;
    const newValue = e.target.value;

    const isIncrement = newValue > oldValue;
    const isDecrement = newValue < oldValue;

    const isPositive = newValue >= 0;

    const isInRange = total < max;

    let maxReatched = isIncrement && !isInRange ? true : false;

    if ((isIncrement && isInRange) || (isDecrement && isPositive)) {
      onChange(name, newValue, title);
      setValue(newValue);
    }

    if (maxReatched) {
      alert("Max value is reached");
    }

    if (isDecrement && !isPositive) {
      alert("Can't be less than 0");
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
          onChange={handleChangeConditional}
          placeholder="10"
        />
      </InputGroup>
    </>
  );
}
