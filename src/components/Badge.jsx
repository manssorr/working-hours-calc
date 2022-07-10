import React from "react";
import { Kbd } from "react-daisyui";
import colors from "../assets/colors";

export default function Badge({
  title = "Title",
  value = "10",
  type = "normal",
  size = "sm"
}) {
  const styles = {
    backgroundColor:
      value > 15 && value <= 20
        ? colors.success
        : value >= 10 && value <= 15
        ? colors.warning
        : colors.danger,
    color: "#1f2328",
    fontSize:
      size === "lg" ? "2rem" : size === "md" ? "1.5rem" : { undefined },
    fontWeight: size === "sm" ? { undefined } : "bold"
  };

  return (
    <Kbd style={type === "normal" ? {} : styles}>
      {title}: {value}
    </Kbd>
  );
}
