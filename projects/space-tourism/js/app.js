import data from './data.json' assert {type: 'json'};

class App {
    constructor() {
        this.menu_btn = document.querySelector('.btn--menu');
        this.primary_nav = document.querySelector('.nav--primary');

        this.tab_btns = document.querySelectorAll('.btn--tab');
        this.dot_btns = document.querySelectorAll('.btn--dot');

        this.addEventListeners();
    }

    addEventListeners() {
        this.menu_btn.addEventListener('click', () => {
            const isNavExpanded = this.primary_nav.getAttribute('data-expanded');
            if (isNavExpanded === 'false') {
              this.primary_nav.setAttribute('data-expanded', true);
              this.menu_btn.setAttribute('aria-expanded', true);
            }
            else {
              this.primary_nav.setAttribute('data-expanded', false);
              this.menu_btn.setAttribute('aria-expanded', false);
            }
        });

        this.handleSelection(this.tab_btns);
        this.handleSelection(this.dot_btns);

        this.tab_btns.forEach(btn => {
            btn.addEventListener('click', event => {
                const destinations = Object.values(data.destinations).filter(item => item.name === event.target.value);
                document.querySelector('.destination__image').src = destinations[0].images.webp;
                document.querySelector('.destination__image').alt = destinations[0].name;
                document.querySelector('.destination__info').innerHTML = `
                    <h3 class="destination__title text-800 font-bellefair text-white uppercase">${destinations[0].name}</h3>
                    <p>
                        ${destinations[0].description}
                    </p>
                    <div class="destination__stats grid uppercase">
                        <div class="destination__stat">
                            <h4 class="text-300 font-barlow-cond letter-space-400">Avg. distance</h4>
                            <p class="text-500 text-white">${destinations[0].distance}</p>
                        </div>
                        <div class="destination__stat">
                            <h4 class="text-300 font-barlow-cond letter-space-400">Est. travel time</h4>
                            <p class="text-500 text-white">${destinations[0].travel}</p>
                        </div>
                    </div>
                `;
            })
        });

        this.dot_btns.forEach(btn => {
            btn.addEventListener('click', event => {
                const person = Object.values(data.crew).filter(item => item.name === event.target.value)
                document.querySelector('.crew__image').src = person[0].images.webp;
                document.querySelector('.crew__image').alt = person[0].name;
                document.querySelector('.crew__info').innerHTML = `
                <div class="crew__title text-600 font-bellefair text-light uppercase flow" style="--flow-space: 1rem">
                    <h3>${person[0].role}</h3>
                    <p class="text-700 text-white">${person[0].name}</p>
                </div>
                <p>
                    ${person[0].bio}
                </p>
                `
            })
        });
    }

    handleSelection(elements) {
        elements.forEach(item => {
            item.addEventListener('click', () => {
                for (let element of elements) {
                    const isSelected = element.getAttribute('aria-selected');
                    if (isSelected === 'true') {
                        element.setAttribute('aria-selected', false);
                        break;
                    }
                }
                item.setAttribute('aria-selected', true);
            })
        })
    }
}

new App();
