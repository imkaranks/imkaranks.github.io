import portfolio from "./data/portfolio.js";
import services from "./data/services.js";

class App {
    constructor() {
        this.$hero_word = document.querySelector(".hero__word");
        this.$header = document.querySelector(".header__content");
        this.$btn_theme = document.querySelector(".btn--theme");
        this.$btn_menu = document.querySelector(".btn--menu");
        this.$services = document.querySelector(".service-cards");
        this.$portfolio = document.querySelector(".portfolio-cards");
        this.$nav_items = document.querySelectorAll(".primary-nav-list .nav__item");

        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('scroll', () => {
            const header_style = this.$header.style;
            if (scrollY > 75) {
                header_style.position = "fixed";
                header_style.top = "0";
                header_style.background = "#0f0f0f";
            }
            else {
                header_style.position = "static";
                header_style.background = "unset";
            }
        });

        this.loadAnimation();

        this.handleClick(this.$btn_theme, () => {
            const body_class = document.body.classList;
            body_class.contains('light')
            ?body_class.replace('light', 'dark')
            :body_class.replace('dark', 'light')
        });
        
        this.handleClick(this.$btn_menu, () => {
            document.querySelector('.primary-nav').classList.toggle('expand');
        });

        this.$nav_items.forEach(item => {
            item.addEventListener('click', () => {
                for (let item of this.$nav_items) {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        break;
                    }
                }
                item.classList.add('active');
            });
        });
        
        portfolio.forEach(card => {
            this.$portfolio.innerHTML += `
                <a href=${card.projectUrl} class="card bg-surface relative flow" style="--flow-space: 1rem;text-decoration:none;color: inherit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="41" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    <h3 class="card__title font-heading uppercase">${card.title}</h3>
                    <p class="text-sm">${card.content}</p>
                </a>
            `;
        });

        services.forEach(service => {
            this.$services.innerHTML += `
                <div class="card bg-surface flow" style="--flow-space: 1rem">
                    <img src=${service.imgUrl} height="41px" alt="...">
                    <h3 class="card__title font-heading uppercase">${service.title}</h3>
                    <p class="text-sm">${service.content}</p>
                </div>
            `;
        });
    }
    
    loadAnimation() {
        const words = ['creative', 'designing', 'development', 'crafting'];
        let currentWord = 0;
        setInterval(() => {
            if (currentWord === words.length) {
                currentWord = 0;
            }
            this.$hero_word.innerHTML = words[currentWord++]
        }, 2000);
    }

    handleClick(array, callback) {
        array.addEventListener('click', callback);
    }
}

new App();