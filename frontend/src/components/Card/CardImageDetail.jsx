import React from "react";

function CardImageDetail({url, ...props}) {
  return (
    <div class="w-full rounded-lg">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 text-center">{props.title}</h1>		
			<img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded mx-auto" alt={props.alt} src={url} />
    </div>);
}

export default CardImageDetail;
