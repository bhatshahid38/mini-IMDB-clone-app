import "./styles.css";
// Search functionality
// Get the search input, search button and search results elements from the DOM
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");

// Add an event listener to the search input that listens for input events
searchInput.addEventListener("input", async () => {
  // Get the value of the search input
  const searchTerm = searchInput.value;
  // Define the API key to use in the request
  const apiKey = "482896fe";
  // Fetch the search results from the OMDB API using the search term and API key
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
  );
  // Convert the response to a JSON object
  const data = await res.json();
  // Clear the previous search results
  searchResults.innerHTML = "";
  // Check if the data contains a "Search" property
  if (data.Search) {
    // Loop through each movie in the search results
    data.Search.forEach((movie) => {
      // Add the movie to the search results list
      searchResults.innerHTML += `
        <div class="movie">
          <h2>${movie.Title}</h2>
          <img src="${movie.Poster}" alt="${movie.Title}">
          <button class="favorite-button">Add to favorites</button>
        </div>
      `;
    });

    const favoriteButtons = document.querySelectorAll(".favorite-button");
    favoriteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const movie = button.parentElement;
        addToFavorites(movie);
      });
    });
  } else {
    searchResults.innerHTML = "<p>No results found.</p>";
  }
});
// Favorite functionality
const favoritesList = document.getElementById("favorites-list");

function addToFavorites(movie) {
  const movieTitle = movie.querySelector("h2").innerText;
  const moviePoster = movie.querySelector("img").src;
  favoritesList.innerHTML += `
    <li>
      <h3>${movieTitle}</h3>
      <img src="${moviePoster}" alt="${movieTitle}">
      <button class="remove-button">Remove from favorites</button>
    </li>
  `;
  localStorage.setItem("favorites", favoritesList.innerHTML);
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movie = button.parentElement;
      removeFromFavorites(movie);
    });
  });
}

function removeFromFavorites(movie) {
  movie.remove();
  localStorage.setItem("favorites", favoritesList.innerHTML);
}

// Movie page
const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const moviePlot = document.getElementById("movie-plot");
const moviePage = document.getElementById("movie-page");

function showMoviePage(data) {
  movieTitle.innerText = data.Title;
  moviePoster.src = data.Poster;
  moviePlot.innerText = data.Plot;
  moviePage.style.display = "block";
  moviePoster.src = data.Poster;
}

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
  console.log("2");
  console.log("11");
  moviePage.style.display = "none";
});
