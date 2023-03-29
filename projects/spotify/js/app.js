const $secondaryNav = document.querySelector(".secondary-nav");
const $btnMenu = document.querySelector(".btn-menu")
const $playlistContainers = document.querySelectorAll(".grid-playlist");
const $primaryNavLinks = document.querySelectorAll('[ data-require-login="true"]');
const $modal = document.querySelector(".modal");
const $closeModalBtn = document.querySelector(".btn-close-modal");

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

$primaryNavLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    if($modal.style.display !== "block"){
      $modal.style.display = "block";
    }
    $modal.style.top = `${event.pageY}px`;
    $modal.style.transform = "translateY(-20%)";
  })
});

$closeModalBtn.addEventListener('click', () => {
  $modal.style.display = "none";
})
