import axios from "axios";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY: string = "AIzaSyCa92-mf0b-R0TqVnG4dMUBNHjQk3V0lEg";

type GoogleGeocodingResponse = {
	results: { geometry: { location: { lat: number; lng: number } } }[];
	status: "OK" | "ZERO_RESULTS";
};

const formSubmitHandler = (event: Event): void => {
	event.preventDefault();

	const input = addressInput.value;

	axios
		.get<GoogleGeocodingResponse>(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
				input,
			)}&key=${GOOGLE_API_KEY}`,
		)
		.then((response) => {
			if (response.data.status !== "OK") {
				throw new Error("Unable to get Address");
			} else {
				const coordinates = response.data.results[0].geometry.location;

				const map = new google.maps.Map(document.getElementById("map")!, {
					center: coordinates,
					zoom: 16,
				});

				new google.maps.Marker({
					position: coordinates,
					map: map,
				});
			}
		})
		.catch((err) => {
			alert(err.message);
			console.log(err);
		});
};

form.addEventListener("submit", formSubmitHandler);
