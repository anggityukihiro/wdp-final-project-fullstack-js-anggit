import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading({text, ...props}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }} class="mx-auto items-center w-full">
      <AiOutlineLoading3Quarters /><span>{text}</span>
    </div>
  );
}

export default Loading;
