import React, { useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputMaxMin({
  title,
  name,
  val,
  onChange,
  max,
  min,
  isDisabled = false,
  type
}) {
  const [value, setValue] = useState(val);

  const handleChangeMax = (e) => {
    const oldValue = value;
    const newValue = e.target.value;

    const isDecrement = newValue < oldValue;
    const isPositive = newValue >= 0;
    const isMaxEqualMin = max === min;

    if (isDecrement && !isPositive) {
      alert("Max can't be less than 0");
    } else if (isMaxEqualMin && isDecrement) {
      alert("Max can't be less than min");
    } else {
      setValue(newValue);
      onChange(name, newValue, title);
    }
  };

  const handleChangeMin = (e) => {
    const oldValue = value;
    const newValue = e.target.value;
    const isIncrement = newValue > oldValue;
    const isDecrement = newValue < oldValue;

    const isPositive = newValue >= 0;

    const isMaxEqualMin = max === min;

    if (isDecrement && !isPositive) {
      alert("Min can't be less than 0");
    } else if (isMaxEqualMin && isIncrement) {
      alert("Min can't be more than Max");
    } else {
      setValue(newValue);
      onChange(name, newValue, title);
    }
  };

  const onChangeMinMax = type === "max" ? handleChangeMax : handleChangeMin;

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
          onChange={onChangeMinMax}
          placeholder="10"
        />
      </InputGroup>
    </>
  );
}
