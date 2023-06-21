const apiKey = 'live_6MLE4xVISCM9JD833R6DaN0RNW7l2Ri8mBWabGMLck0E35NbUdfXqPNQ0zTPcXUi';
export function fetchBreeds() {
  const url = "https://api.thecatapi.com/v1/breeds";
    return fetch(url, {
        headers: {
          'x-api-key': apiKey
      }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch breeds");
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_6MLE4xVISCM9JD833R6DaN0RNW7l2Ri8mBWabGMLck0E35NbUdfXqPNQ0zTPcXUi`;
    return fetch(url, {
        headers: {
          'x-api-key': apiKey
      }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch cat by breed");
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No cat found for the selected breed');
      }
      const catData = data[0];
      const breedInfo = catData.breeds[0];
      
      return {
        image: catData.url,
        breed: breedInfo.name,
        description: breedInfo.description,
        temperament: breedInfo.temperament,
      };
    });
}



