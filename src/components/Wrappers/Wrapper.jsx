import React from "react";

export default function Wrapper({ children, title = "put title here" }) {
  return (
    <div className="border-solid border-1 border-gray-500 rounded-lg p-2 flex flex-col justify-between items-center">
      <h1
        className="
        text-2xl
        font-bold
        text-center
        font-serif
        "
      >
        {title}
      </h1>
      {children}
    </div>
  );
}
