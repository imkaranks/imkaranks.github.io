const $menuBtn = document.querySelector('.btn--menu');
const $primaryNav = document.querySelector('.nav--primary');

const $tabBtns = document.querySelectorAll('.btn--tab');
const $dotBtns = document.querySelectorAll('.btn--dot');
const $roundedBtns = document.querySelectorAll('.btn--rounded');

function expandMenu() {
  const isNavExpanded = $primaryNav.getAttribute('data-expanded');
  if (isNavExpanded === 'false') {
    $primaryNav.setAttribute('data-expanded', true);
    $menuBtn.setAttribute('aria-expanded', true);
  }
  else {
    $primaryNav.setAttribute('data-expanded', false);
    $menuBtn.setAttribute('aria-expanded', false);
  }
}

$menuBtn.addEventListener("click", expandMenu);

function handleActiveState(elements) {
  elements.forEach(item => {
    item.addEventListener('click', () => {
      for (let element of elements) {
        const isActive = element.getAttribute('data-active');
        if (isActive === 'true') {
          element.setAttribute('data-active', false);
          break;
        }
      }
      item.setAttribute('data-active', true);
    })
  });
}

window.addEventListener("load", async () => {
  try {
    const response = await fetch("./js/data.json");
    if (!response.ok) {
      throw new Error(response.status);
    }
    const { destinations, crew, technology } = await response.json();
    
    if (document.body.classList.contains("bg-layout--destination")) {
      $tabBtns.forEach(btn => {
        btn.addEventListener("click", event => {
          loadDestinationCard(event.target.dataset.controls, destinations);
        });
      });
    }
    else if (document.body.classList.contains("bg-layout--crew")) {
      $dotBtns.forEach(btn => {
        btn.addEventListener("click", event => {
          loadCrewCard(event.target.dataset.controls, crew);
        });
      });
    }
    else if (document.body.classList.contains("bg-layout--technology")) {
      $roundedBtns.forEach(btn => {
        btn.addEventListener("click", event => {
          loadTechnologyCard(event.target.dataset.controls, technology);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});

handleActiveState($tabBtns);

function loadDestinationCard (planet, data) {
  const [ destination ] = data.filter(item => item.name === planet);

  document.querySelector('.destination__image').src = destination.images.webp;
  document.querySelector('.destination__image').alt = destination.name;
  document.querySelector('.destination__info').innerHTML = `
    <h3 class="destination__title text-800 font-accent text-white uppercase">${destination.name}</h3>
    <p>${destination.description}</p>
    <div class="destination__stats grid uppercase">
        <div class="destination__stat">
            <h4 class="text-300 font-primary-cond letter-space-400">Avg. distance</h4>
            <p class="text-500 text-white">${destination.distance}</p>
        </div>
        <div class="destination__stat">
            <h4 class="text-300 font-primary-cond letter-space-400">Est. travel time</h4>
            <p class="text-500 text-white">${destination.travel}</p>
        </div>
    </div>
    `;
}

handleActiveState($dotBtns);

function loadCrewCard (crew, data) {
  const [ person ] = data.filter(item => item.name === crew);

  document.querySelector('.crew__image').src = person.images.webp;
  document.querySelector('.crew__image').alt = person.name;
  document.querySelector('.crew__info').innerHTML = `
    <div class="crew__title text-600 font-accent text-light uppercase flow" data-spacing="sm">
      <h3>${person.role}</h3>
      <p class="text-700 text-white">${person.name}</p>
    </div>
    <p>${person.bio}</p>
    `;
}

handleActiveState($roundedBtns);

function loadTechnologyCard (tech, data) {
  const [ technology ] = data.filter(item => item.name === tech);

  document.querySelector('picture>source').srcset = technology.images.portrait;
  document.querySelector('picture>img').src = technology.images.landscape;
  document.querySelector('picture>img').alt = technology.name;
  document.querySelector('.technology-article').innerHTML = `
    <div class="text-600 font-accent text-light uppercase flow" data-spacing="sm">
      <h2 class="text-400">The terminology...</h2>
      <p class="technology-name text-700 text-white">${technology.name}</p>
    </div>
    <p class="technology-description">${technology.description}</p>`;
}