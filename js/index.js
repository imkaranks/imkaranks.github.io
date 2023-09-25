"use strict";

(function () {
  const $heroHeadline = document.querySelector(".hero__headline");
  const $headerContent = document.querySelector(".header__content");
  const $themeBtn = document.querySelector(".btn--theme");
  const $menuBtn = document.querySelector(".btn--menu");
  const $servicesContent = document.querySelector(".service-cards");
  const $portfolioContent = document.querySelector(".portfolio-cards");
  const $primaryNav = document.querySelector(".primary-nav");
  const $navItems = document.querySelectorAll(".primary-nav-list .nav__item");
  const $cursor = document.getElementById('cursor');

  let prev = 0;

  if (window.matchMedia('(pointer: fine)').matches) {
    $cursor.style.opacity = '1';
    document.onmousemove = function (event) {
      if (
        event.target.tagName === 'A' ||
        event.target.tagName === 'BUTTON' ||
        event.target.parentNode.tagName === 'A' ||
        event.target.parentNode.tagName === 'BUTTON'
      ) {
        $cursor.classList.add('link');
        $cursor.textContent = 'Click';
      } else {
        $cursor.classList.remove('link');
        $cursor.textContent = '';
      }
      gsap.to($cursor, {
        top: event.pageY + 'px',
        left: event.pageX + 'px'
      });
    }
  }

  window.onload = function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    animateHeadline(['creative', 'designing', 'development', 'crafting'], $heroHeadline);
    fetch('./data.json')
      .then(raw => raw.json())
      .then(data => {
        const { portfolio, services } = data;
        renderSection($portfolioContent, portfolio);
        renderSection($servicesContent, services);
      })
      .catch(error => console.log(error));
  }

  window.onscroll = function () {
    if (scrollY > 75) {
      gsap.to($headerContent, {
        position: 'fixed',
        top: 0,
        background: '#0f0f0f'
      });
    }
    else {
      gsap.to($headerContent, {
        position: 'static',
        background: 'transparent'
      });
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

  function renderSection($section, infos) {
    let clutter = '';
    infos.forEach(info => {
      clutter += `
        <article class="card bg-surface relative flow" style="--flow-space: 1rem">
          <img src=${info.imgUrl} height="41px" alt=${info.title}>
          <h3 class="card__title font-heading uppercase">${info.title}</h3>
          <p class="text-sm">${info.content}</p>
          ${info.projectUrl ? `<a href=${info.projectUrl} class="absolute inset-0"></a>` : ''}
        </article>`;
    });
    $section.innerHTML = clutter;
  }

  function animateHeadline(words, $textElem) {
    $textElem.classList.add('animate-rotate');
    let count = 0;
    setInterval(() => {
      if (count === words.length) {
        count = 0;
      }
      $textElem.textContent = words[count++];
    }, 2000);
  }

  function handleClick($target, index) {
    $navItems[prev].classList.remove('active');
    prev = index;
    $target.classList.add('active');
  }
})();