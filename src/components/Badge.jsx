import React from "react";
import { Kbd } from "react-daisyui";
import colors from "../assets/colors";

export default function Badge({
  title = "Title",
  value = "10",
  type = "normal",
  size = "sm",
  max = 20,
  min = 15
}) {
  const styles = {
    backgroundColor:
      value > min && value <= max
        ? colors.success
        : value >= (min - 3 > 0 ? min - 3 : 1) && value <= min
        ? colors.warning
        : colors.danger,
    color: "#1f2328",
    fontSize: size === "lg" ? "2rem" : size === "md" ? "1.5rem" : { undefined },
    fontWeight: size === "sm" ? { undefined } : "bold"
  };

  return (
    <Kbd style={type === "normal" ? {} : styles}>
      {title}: {value}
    </Kbd>
  );
}
