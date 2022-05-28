import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardImage from "../../components/Card/CardImage";
import Loading from "../../components/Loading";

class NarutoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	} 

	componentDidMount() {
		fetch("https://api.jikan.moe/v4/anime?q=naruto")
			.then((response) => response.json())
			.then((data) => this.setState({ data: data }));
	}    

	render() {
		const { data } = this.state;

		return (
            <div class="container px-5 pb-10 mx-auto pt-20">
				{!data && (
                    <Loading text={'Loading... Please Wait'} />
				)}
                <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">                
				{data &&
					data.data.map((value) => (
                        <div class = "p-4 md:w-1/3 sm:mb-0 mb-6 border-4" >
                            <CardImage url={value.images.jpg.image_url} alt={'Naruto'} />                                
                            <div class="px-5">
                                <h2 class="text-xl font-medium title-font text-gray-900 mt-5">{value.title}</h2>
                                <h5 class="text-base leading-relaxed mt-2">Score : {value.score}</h5>
                                <h5 class="text-base leading-relaxed mt-2">Type : {value.type}</h5>
                                <h5 class="text-base leading-relaxed mt-2">Rated : {value.rating}</h5>
							    <Link className = "text-indigo-500 inline-flex items-center mt-3" to={`/naruto/${value.mal_id}`}>
								    Details
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>                                
							    </Link>
                            </div>
                        </div>         
					))}
                </div>
				<h4 class="text-base leading-relaxed mt-20 text-center">Source : <a href="https://jikan.moe/" target="_blank" rel="noreferrer">https://jikan.moe/</a></h4>
            </div>
		);
	}
}

export default NarutoList;
