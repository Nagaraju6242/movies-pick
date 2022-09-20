const BASE_URL = "http://www.omdbapi.com/?apikey=7b1f29b9&s=";
var timeout = null;

const search = () => {
	var query = $("#search").val();
	if (query.trim().length > 0) {
		clearTimeout(timeout);
		timeout = setTimeout(
			function (q) {
				getMovieData(q).then((data) => {
					$(".card:not('.hidden')").remove();
					$(".cards h1").remove();
					populateData(data);
				});
			},
			500,
			query
		);
	}
};

$("#search").on("input", search);
$(".search-btn").on("click", search);

const populateData = (data) => {
	if (data["Response"] === "True") {
		data["Search"].forEach((cardData) => {
			card = $(".card.hidden").clone();
			card.find(".title").text(cardData["Title"]);
			card.find(".year span").text(cardData["Year"]);
			card.find(".type span").text(cardData["Type"]);
			card.find("img").attr("src", cardData["Poster"]);
			card.removeClass("hidden");
			$(".cards").append(card);
		});
	} else {
		$(".card:not('.hidden')").remove();
		$(".cards").append("<h1>No Results Found</h1>");
	}
};

async function getMovieData(query) {
	var response = await fetch(BASE_URL + query);
	var data = await response.json();
	return data;
}
