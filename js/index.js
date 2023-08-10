import portfolio from "./data/portfolio.js";
import services from "./data/services.js";

(function(){
  const $heroHeadline = document.querySelector(".hero__headline");
  const $headerContent = document.querySelector(".header__content");
  const $themeBtn = document.querySelector(".btn--theme");
  const $menuBtn = document.querySelector(".btn--menu");
  const $servicesContent = document.querySelector(".service-cards");
  const $portfolioContent = document.querySelector(".portfolio-cards");
  const $primaryNav = document.querySelector(".primary-nav");
  const $navItems = document.querySelectorAll(".primary-nav-list .nav__item");

  let prev = 0;

  window.onload = function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    animateHeadline(['creative', 'designing', 'development', 'crafting'], $heroHeadline);
  }

  window.onscroll = function () {
    const styles = $headerContent.style;
    if (scrollY > 75) {
      styles.position = "fixed";
      styles.top = "0";
      styles.background = "#0f0f0f";
    }
    else {
      styles.position = "static";
      styles.background = "unset";
    }
  }

  $navItems.forEach((item, index) => {
    item.onclick = () => handleClick(item, index);
  });

  $themeBtn.onclick = function (e) {
    const $body = document.body;
    if ($body.classList.contains('light')) {
      $body.classList.remove('light');
      $body.classList.add('dark');
    } else {
      $body.classList.remove('dark');
      $body.classList.add('light');
    }
  }

  $menuBtn.onclick = function (e) {
    const expanded = e.currentTarget.getAttribute('aria-expanded');
    if (expanded === "true") {
      e.currentTarget.setAttribute('aria-expanded', false);
    } else {
      e.currentTarget.setAttribute('aria-expanded', true);
    }
    $primaryNav.classList.toggle('expand');
  }

  portfolio.forEach(info => {
    $portfolioContent.innerHTML += `
      <a href=${info.projectUrl} class="card bg-surface relative flow" style="--flow-space: 1rem;text-decoration:none;color: inherit">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="41" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        <h3 class="card__title font-heading uppercase">${info.title}</h3>
        <p class="text-sm">${info.content}</p>
      </a>`;
  });

  services.forEach(info => {
    $servicesContent.innerHTML += `
      <div class="card bg-surface flow" style="--flow-space: 1rem">
        <img src=${info.imgUrl} height="41px" alt="...">
        <h3 class="card__title font-heading uppercase">${info.title}</h3>
        <p class="text-sm">${info.content}</p>
      </div>`;
  })

  function animateHeadline(words, $text) {
    let count = 0;
    setInterval(() => {
      if (count === words.length) {
        count = 0;
      }
      $text.textContent = words[count++];
    }, 2000);
  }

  function handleClick($target, index) {
    $navItems[prev].classList.remove('active');
    prev = index;
    $target.classList.add('active');
  }
})();