import React, { useEffect, useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputPercentage({
  title,
  name,
  val,
  onChange,
  isDisabled = false,
  reset
}) {
  const [value, setValue] = useState(val);

  useEffect(() => {
    console.log("reset", reset);
    console.log("🚀 ~ InputPercentage Iam reseted 🥳");
    setValue(val);
  }, [reset]);

  const handleChangePercentage = (e) => {
    const oldValue = value;
    const newValue = e.target.value;
    const isIncrement = newValue > oldValue;
    const isDecrement = newValue < oldValue;

    const isPositive = newValue >= 0;
    const outOfPercentage = newValue > 100;

    if (isDecrement && !isPositive) {
      alert("Can't be less than 0");
    } else if (isIncrement && outOfPercentage) {
      alert("Can't be more than 100");
    } else {
      onChange(name, newValue, title);
      setValue(newValue);
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
          onChange={handleChangePercentage}
          placeholder="10"
        />
      </InputGroup>
    </>
  );
}
