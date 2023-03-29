import { playlists } from "./data.js";
const $songContainers = document.querySelectorAll(".grid-playlist");

function shuffle(array) {
  const newArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

function randomize(arr) {
  let i, j, tmp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export const populateSection = () => {
  let count = 0;
  for (let playlistCount in playlists) {
    const shuffledIndex = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (let i = 0; i < 5; i++) {
      count = count < 9 ? count += 1 : 0;
      $songContainers[playlistCount]
        .innerHTML += `
        <div class="playlist-card">
          <img src="./assets/thumbnail (${shuffledIndex[count]}).jpg" alt="song-thumbnail">
          <h3>${playlists[playlistCount][i].title}</h3>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <div class="song-play-icon">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>`;
    }
  }
}

export const populatePlaylists = () => {
  let id = getQueryParams("id");

  let count = 0;
  const shuffledIndex = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  playlists[id-1].forEach(playlist => {
    count = count < 9 ? count += 1 : 0;
    $songContainers[0]
      .innerHTML += `
      <div class="playlist-card">
        <img src="./assets/thumbnail (${shuffledIndex[count]}).jpg" alt="song-thumbnail">
        <h3>${playlist.title}</h3>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <div class="song-play-icon">
          <i class="fa-solid fa-play"></i>
        </div>
      </div>`;
  });
}

function getQueryParams(query) {
  let queryParams = new URLSearchParams(window.location.search);
  return parseInt(queryParams.get(query));
}

export const getCategory = () => playlists[getQueryParams("id")-1][0].belongs;