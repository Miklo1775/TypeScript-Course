import axios from "axios";

const form = <HTMLFormElement>document.querySelector("form")!;
const addressInput = <HTMLInputElement>document.getElementById("address")!;

const GOOGLE_API_PROJECT_KEY = "AIzaSyCG8U3C6WP3xtlck-MDJH_8pAtVupkLFhM";

const searchHandler = (e: Event) => {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_PROJECT_KEY}`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

form.addEventListener("submit", searchHandler);
