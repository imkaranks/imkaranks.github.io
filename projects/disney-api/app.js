class App {
    constructor() {
        this.$character_input = document.querySelector("#character-name");
        this.$submitBtn = document.querySelector(".btn[type='submit']");
        this.$forms = document.querySelectorAll("form");
        this.$search_form = document.querySelector(".form--search");
        this.$matched_characters = document.querySelector(".matched-characters");
        this.$slide_btns = document.querySelectorAll('.btn--slide');
        this.$featured_characters = document.querySelector('.container--featured');

        this.url = 'https://api.disneyapi.dev/character';

        this.addEventListeners();
    }

    addEventListeners() {
        this.$forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
            });
        });

        (async() => {
            const { data } = await this.getData('prince');
            for (let i = 0; i < 12; i++) {
                this.$featured_characters.innerHTML += `
                    <div class="card border-0 shadow m-2 bg-white rounded overflow-hidden flex-shrink-0" style='padding:0'>
                        <img src=${data[i].imageUrl} class="card-img-top" style="object-fit:cover; height: 20rem;" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">${data[i].name}</h5>
                        </div>
                    </div>
                `;
            }
        }) ();

        this.$slide_btns.forEach(btn => {
            btn.addEventListener('click', e => {
                if (e.target.value === 'right') {
                    this.$featured_characters.scrollLeft += 256;
                }
                else if (e.target.value === 'left') {
                    this.$featured_characters.scrollLeft -= 256;
                }
            });
        });

        this.$submitBtn.addEventListener('click', async () => {
            this.$matched_characters.innerHTML = '';
            try {
                const { data } = await this.getData(this.$character_input.value);
                for (let item of data) {
                    this.$matched_characters.innerHTML += `
                        <div class="card shadow-sm rounded overflow-hidden col-12 col-sm-6 col-md-4 col-lg-3" style='padding:0'>
                            <img src=${item.imageUrl} class="card-img-top" style="object-fit:cover; height: 20rem;" alt="...">
                            <div class="card-body">
                                <h5 class="card-title text-center">${item.name}</h5>
                            </div>
                        </div>
                    `;
                }
            }
            catch (error) {
                console.log(error);
            }
            
        })
    }

    async getData(query) {
        const response = await fetch('https://api.disneyapi.dev/character?name='+query);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    }
}

new App();
