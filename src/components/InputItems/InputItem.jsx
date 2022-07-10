import React, { useEffect, useState } from "react";
import { Input, InputGroup } from "react-daisyui";

export default function InputItem({
  title,
  name,
  val,
  onChange,
  isDisabled = false
}) {
  const [value, setValue] = useState(val);

  const handleChange = (e) => {
    onChange(name, value, title);
    setValue(e.target.value);
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
          onChange={handleChange}
          placeholder="10"
        />
      </InputGroup>
    </>
  );
}
