import React from "react";

export default function LineWrapper({ children }) {
  return (
    <div className=" flex-1 gap-4 border-solid border-2  border-sky-500 rounded-lg p-1 m-2">
      {children}
    </div>
  );
}
