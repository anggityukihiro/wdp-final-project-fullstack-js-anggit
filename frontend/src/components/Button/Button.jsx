import React from "react";

function Button({text, ...props}) {
  return (
    <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">{text}</button>
  );
}

export default Button;
