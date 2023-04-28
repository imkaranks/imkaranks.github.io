const apiKey = "92b32c6d76b6dd7cd754c111db77a6f9";
const apiStartPoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const moviesWrapper = document.querySelector(".movies");
const recentlyWatchedMovies = JSON.parse(localStorage.getItem('movies')) || [];
let scrollPositions = {};

const apiPaths = {
  allCategories: `${apiStartPoint}/genre/movie/list?api_key=${apiKey}`,
  moviesList: (id) => `${apiStartPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
  trending: `${apiStartPoint}/trending/all/day?api_key=${apiKey}&language=en-US`,
  searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBJl-siuihZ_XwBSiYLgS4Zhn6dTKXqoG8`
}

function initializeApp() {
  buildRecentlyWatched();
  fetchTrendingMovies();
  fetchAllCategories();
}

const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(apiPaths.trending);
    const { results: movies } = await response.json();
    const randomIndex = Math.floor(Math.random() * movies.length);
    buildMoviesList(movies.slice(0, 8), 'Trending Now');
    buildHeroBanner(movies[randomIndex]);
  } catch (err) {
    console.error(err);
  }
}

function buildHeroBanner(movie) {
  const bannerCont = document.querySelector('.hero');

  bannerCont.setAttribute('style', `--image: url('${imgPath}${movie.backdrop_path}')`)

  const div = document.createElement('div');
  div.className = "container";

  div.innerHTML = `
    <div class="hero-content flow" data-spacing="sm">
      <h1 class="hero-title">${movie.title ?? movie.name}</h1>
      <p class="hero-subtitle">Trending in movies | Released - ${movie.release_date ?? movie.first_air_date}</p>
      <p>${formatDescText(movie.overview)}</p>
      <div class="hero-cta flex" data-spacing="sm">
        <button class="btn-hero-cta" onClick="playYtTrailer('${movie.title ?? movie.name}')">Play now</button>
        <button class="btn-hero-cta">More info</button>
      </div>
    </div>
      `;

  bannerCont.append(div);
}

function formatDescText(desc) {
  return desc && desc.length > 200
    ? desc.slice(0, 200).trim() + "..."
    : desc;
}

const fetchAllCategories = async () => {
  try {
    const response = await fetch(apiPaths.allCategories);
    const { genres } = await response.json();
    if (Array.isArray(genres) && genres.length) {
      genres.slice(0, 5).forEach(genre => {
        fetchMoviesList(genre.id, genre.name);
      });
    }
    return genres;
  } catch (err) {
    console.error(err);
  }
}

const fetchMoviesList = async (id, genreName) => {
  try {
    const response = await fetch(apiPaths.moviesList(id));
    const { results } = await response.json();
    if (Array.isArray(results) && results.length) {
      buildMoviesList(results.slice(0, 8), genreName);
    }
  } catch (err) {
    console.error(err);
  }
}

function buildMoviesList(movies, genreName) {
  scrollPositions = { ...scrollPositions, [genreName]: 0 };
  moviesWrapper.innerHTML += `
  <section class="section movies-section">
    <h2 class="section-title">${genreName} <span class="explore-badge">Explore All</span></h2>
    <div class="movies-row flex" id="${genreName}" data-spacing="sm">
      ${movies.map(movie => buildMoviesItem(movie)).join('')}
    </div>
    <button class="btn-prev" aria-controls="${genreName}" onclick="handlePrevBtn('${genreName}')">
      <svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%"><path d="M 19.41,20.09 14.83,15.5 19.41,10.91 18,9.5 l -6,6 6,6 z" fill="#fff"></path></svg>
    </button>
    <button class="btn-next" aria-controls="${genreName}" onclick="handleNextBtn('${genreName}')">
      <svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%"><path d="m 12.59,20.34 4.58,-4.59 -4.58,-4.59 1.41,-1.41 6,6 -6,6 z" fill="#fff"></path></svg>
    </button>
  </section>`;
}

function buildMoviesItem(movie) {
  const movieImage =
    movie.backdrop_path
      ? `${imgPath}${movie.backdrop_path}`
      : "https://th.bing.com/th/id/R.def709d1791f697ec8fcd567f000493e?rik=2Zc62JV6sv5bvQ&riu=http%3a%2f%2fwww.magicdigitalalbum.com%2fphotos%2fphoto-not-available.jpg&ehk=WmCYeEe5ttrYIj6hft5TtG%2bC1whLC%2bY11rUZ5XbnBzI%3d&risl=&pid=ImgRaw&r=0";

  return `<div class="movies-item" tabindex="0">
            <img src=${movieImage} alt="${movie.title}" onClick="playYtTrailer('${movie.title ?? movie.name}', '${movieImage}')" loading="lazy">
          </div>`;
}

function playYtTrailer(movieName, movieImage=null) {
  if (movieImage !== null) {
    addToRecentlyWatched(movieName, movieImage);
  }
  searchYoutubeTrailer(movieName)
    .then(videoId => {
      const video = document.querySelector('iframe');
      video.style.display = "block";
      video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    })
    .catch(err => console.error(err));
}

function searchYoutubeTrailer(movieName) {
  if (!movieName) return;

  return fetch(apiPaths.searchOnYoutube(`${movieName} trailer`))
    .then(response => response.json())
    .then(data => {
      const topResult = data.items[0];
      const youtubeURL = `https://www.youtube.com/watch?v=${topResult.id.videoId}`;
      return topResult.id.videoId;
    })
    .catch(err => console.error(err));
}

window.addEventListener("load", initializeApp);

const menuToggleBtn = document.querySelector(".primary-nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggleBtn.addEventListener("click", () => {
  const isExpanded = primaryNav.getAttribute("data-expanded");
  if (isExpanded === 'true') {
    primaryNav.setAttribute("data-expanded", false);
  } else {
    primaryNav.setAttribute("data-expanded", true);
  }
});

function handlePrevBtn(control) {
  const section = document.getElementById(control);
  if (scrollPositions[control] < 0) {
    scrollPositions[control] += 260;
    section.style.transform = `translateX(${scrollPositions[control]}px)`;
  }
}

function handleNextBtn(control) {
  const section = document.getElementById(control);
  const availableSpace = (section.scrollWidth - section.clientWidth) * -1;
  if (scrollPositions[control] > availableSpace) {
    scrollPositions[control] -= 260;
    section.style.transform = `translateX(${scrollPositions[control]}px)`;
  }
}

function addToRecentlyWatched(movieName, movieImage) {
  const newMovie = {
    name: movieName,
    imageURL: movieImage
  }
  if (recentlyWatchedMovies.length < 6) {
    recentlyWatchedMovies.unshift(newMovie);
  } else {
    recentlyWatchedMovies.unshift(newMovie);
    recentlyWatchedMovies.splice(5, 1);
  }
  localStorage.setItem('movies', JSON.stringify(recentlyWatchedMovies));
  buildRecentlyWatched();
}

function buildRecentlyWatched() {
  const $recentlyWatched = document.getElementById('recently-watched');
  const $recentlyWatchedSection = document.querySelector('#recently-watched-section');
  const movies = JSON.parse(localStorage.getItem('movies'));

  if(movies?.length){
    $recentlyWatchedSection.style.display = 'block';
    $recentlyWatched.innerHTML = '';
    movies.forEach(movie => {
      $recentlyWatched.innerHTML += `
        <div class="movies-item" tabindex="0" onClick="playYtTrailer('${movie.name}')">
          <img src=${movie.imageURL} alt="${movie.name}">
        </div>`;
    });
  } else {
    $recentlyWatchedSection.style.display = 'none';
  }
}
