
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function populateBreedsSelect() {
  loader.style.display = "block";
  breedSelect.style.display = "none";

  fetchBreeds()
    .then((breeds) => {
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      loader.style.display = "none";
      breedSelect.style.display = "block";
    })
    .catch(error => {
      console.error('Failed to fetch breeds:', error);
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}

function displayCatInfoByBreed(breedId) {
  loader.style.display = "block";
    catInfoDiv.style.display = "none";
    error.style.display = "none";

  fetchCatByBreed(breedId)
    .then(cat => {
        

      const image = document.createElement("img");
        image.src = cat.image;
        image.style.width = '300px';
        image.style.marginTop = '15px';

      const name = document.createElement("p");
        name.textContent = `Breed: ${cat.breed}`;
        name.classList.add = ("bold-text");

      const description = document.createElement("p");
        description.textContent = `Description: ${cat.description}`;
        description.classList.add = ("bold-text");

      const temperament = document.createElement("p");
        temperament.textContent = `Temperament: ${cat.temperament}`;
        temperament.classList.add = ("bold-text");

      catInfoDiv.innerHTML = "";
      catInfoDiv.appendChild(image);
      catInfoDiv.appendChild(name);
      catInfoDiv.appendChild(description);
      catInfoDiv.appendChild(temperament);

      loader.style.display = "none";
      catInfoDiv.style.display = "block";
    })
    .catch(() => {
      loader.style.display = "none";
      error.style.display = "block";
    });
}

breedSelect.addEventListener("change", event => {
  const selectedBreedId = event.target.value;
  displayCatInfoByBreed(selectedBreedId);
});

populateBreedsSelect();
