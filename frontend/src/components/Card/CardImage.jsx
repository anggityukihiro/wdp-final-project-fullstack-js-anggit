import React from "react";

function CardImage({url, ...props}) {
  return (
    <div class = "rounded-lg h-80 overflow-hidden border-2" >
      <img alt={props.alt} class="object-cover w-full" src={url} />
    </div>);
}

export default CardImage;
