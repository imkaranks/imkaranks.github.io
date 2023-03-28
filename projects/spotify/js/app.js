const $secondaryNav = document.querySelector(".secondary-nav");
const $btnMenu = document.querySelector(".btn-menu")
const $songContainers = document.querySelectorAll(".song-container");

$btnMenu.addEventListener('click', () => {
  const isExpanded = $secondaryNav.getAttribute("data-expanded");

  if (isExpanded === 'false') {
    $secondaryNav.setAttribute("data-expanded", true);
    $btnMenu.setAttribute("aria-expanded", true);
  }
  else {
    $secondaryNav.setAttribute("data-expanded", false);
    $btnMenu.setAttribute("aria-expanded", false);
  }
});

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

const playlist = [
  "Peaceful Piano",
  "Deep Focus",
  "Instrumental Study",
  "Jazz Vibes",
  "Focus Flow",
  "Today's Top Hits",
  "RapCaviar",
  "All Out 2010s",
  "Rock Classics",
  "Chill Hits",
];

for (let i = 0; i < 10; i++) {
  $songContainers.forEach(container => {
    const shuffledPlaylist = shuffle(playlist);
    const shuffledIndex = shuffle([1,2,3,4,5,6,7,8,9,10]);
    container.innerHTML += `
      <div class="song-card">
        <img src="./assets/thumbnail (${shuffledIndex[i]}).jpg" alt="song-thumbnail">
        <h3>${shuffledPlaylist[i]}</h3>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <div class="song-play-icon">
          <i class="fa-solid fa-play"></i>
        </div>
      </div>`;
  });
}

const $prevBtns = document.querySelectorAll('.btn-prev');
const $nextBtns = document.querySelectorAll('.btn-next');

$prevBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const $controls = event.target.dataset.controls;
    slidePrev(document.getElementById(`${$controls}`));
  });
});

$nextBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const $controls = event.target.dataset.controls;
    slideNext(document.getElementById(`${$controls}`));
  });
});

function slideNext(container) {
  container.scrollLeft += 190;
}

function slidePrev(container) {
  container.scrollLeft -= 190;
}