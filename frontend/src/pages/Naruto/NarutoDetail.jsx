import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; 
import Button from "../../components/Button/Button";
import CardImageDetail from "../../components/Card/CardImageDetail";
import Loading from "../../components/Loading";

const NarutoDetail = () => {
	const params = useParams();

	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`https://api.jikan.moe/v4/anime/${params.mal_id}`)
			.then((response) => response.json())
			.then((res) => setData(res));
	}, [params]);

	return (
		<div class="container py-10">
			{!data && (
				<Loading text={'Loading... Please Wait'} />
			)}
			{data && (
				<div class="mx-auto flex px-5 py-10 items-center justify-center flex-col border-2">
					<CardImageDetail url={data.data.images.jpg.image_url} alt={'Naruto Detail'} title={data.data.title} />
					<div class="text-center lg:w-2/3 w-full">
						<p class="mb-8 leading-relaxed">Synopsis : {data.data.synopsis}</p>
					</div>
					<div class="flex justify-center">
						<Link to = "/naruto" >
							<Button text={'Back'} />
						</Link>
						<a href={data.data.url} target="_blank" rel="noreferrer" class="px-5">
							<Button text={'More Detail'} />
						</a> <br/>
					</div>				
				</div>
			)}
		</div>
	);
};

export default NarutoDetail;
