const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

form.addEventListener("submit", formSubmitHandler);

const formSubmitHandler = (event: Event): void => {
	event.preventDefault();
};
