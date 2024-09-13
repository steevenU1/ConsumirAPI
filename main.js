const URL = "https://api.thecatapi.com/v1/images/search";

document.addEventListener("DOMContentLoaded", newCat);

async function newCat () {
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}

const button = document.querySelector("button");

button.onclick = newCat;