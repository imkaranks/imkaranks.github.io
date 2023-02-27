class App {
  constructor() {
    this.$scroll_deck = document.querySelector('.section--featured>.container');
    this.$scroll_btns = document.querySelectorAll('.btn--scroll');
    this.position = 0;
    this.$search_btn = document.querySelector('.btn--search');
    this.$search_input = document.querySelector('input');
    this.$char_article = document.querySelector('article');

    this.api_url = this.url = 'https://api.disneyapi.dev/character';

    this.addEventListeners();
  }

  addEventListeners() {
    this.$scroll_btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('scroll-left')) {
          this.$scroll_deck.scrollLeft -= 256;
        } else {
          this.$scroll_deck.scrollLeft += 256;
        }
      });
    });

    (async () => {
      const { data } = await this.fetchCharacter('prince')
      for (let i = 0; i < 12; i++) {
        this.$scroll_deck.innerHTML += `
          <div class="card card--slide">
            <img src=${data[i].imageUrl} alt="${data[i].name}">
            <p class="card-title">${data[i].name}</p>
          </div>
        `;
      }
    })();

    this.$search_btn.addEventListener('click', async () => {
      if (this.$search_input.value.trim === '') {
        return;
      }
      document.querySelector('.characters-wrapper').innerHTML = '';
      const { data } = await this.fetchCharacter(this.$search_input.value)
      data.forEach(item => {
        document.querySelector('.characters-wrapper').innerHTML += `
          <div class="card card--grid" onclick="hyperlink('?id=${item._id}')">
            <img src=${item.imageUrl} alt="${item.name}">
            <p class="card-title">
              ${item.name}
            </p>
          </div>`
      });
    })

  }

  async fetchCharacter(query) {
    const response = await fetch(`${this.api_url}?name=${query}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.status);
    }
    return data;
  }
}

function hyperlink(params) {
  location.href = `info.html${params}`;
}

new App();
