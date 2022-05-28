import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CardImageDetail from "../../components/Card/CardImageDetail";
import Loading from "../../components/Loading";

const OnepieceDetail = () => {
	const params = useParams();

	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`https://www.omdbapi.com/?apikey=a14d8e20&i=${params.imdbID}`)
			.then((response) => response.json())
			.then((data) => setData(data));
	}, [params]);

	return (
		<div class="container py-10">
			{!data && (
				<Loading text={'Loading... Please Wait'} />
			)}
			{data && (
				<div class="mx-auto flex px-5 py-10 items-center justify-center flex-col border-2">
					<CardImageDetail url={data.Poster} alt={'One Piece Detail'} title={data.Title} />
					<div class="text-center lg:w-2/3 w-full">
						<p class="mb-8 leading-relaxed">Genre : {data.Genre}</p>
						<p class="mb-8 leading-relaxed">Runtime : {data.Runtime}</p>
						<p class="mb-8 leading-relaxed">Plot : {data.Plot}</p>
					</div>
					<div class="flex justify-center">
						<Link to = "/onepiece" >
							<Button text={'Back'} />
						</Link>
					</div>				
				</div>
			)}
		</div>
	);
};

export default OnepieceDetail;
