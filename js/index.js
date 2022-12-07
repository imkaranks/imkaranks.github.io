const primaryNav = document.getElementById("primary-nav");
const navToggle = document.getElementById("nav-toggle");
const expertiseWrapper = document.getElementById("expertise__wrapper");
const themeToggle = document.getElementById("theme-toggle");

navToggle.addEventListener('click', () => {
    primaryNav.hasAttribute("data-visible") ?
        navToggle.setAttribute("aria-expanded", false) :
        navToggle.setAttribute("aria-expanded", true);

    primaryNav.toggleAttribute("data-visible");
});

const replaceClass = (element, prevClass, newClass)=>{
    element.classList.replace(prevClass, newClass)
}

themeToggle.addEventListener('click',()=>{
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
    if(body.classList.contains("light")) {
        replaceClass(body, "light", "dark");
        replaceClass(themeIcon, "fa-sun-o", "fa-moon-o");
    }
    else {
        replaceClass(body, "dark", "light");
        replaceClass(themeIcon, "fa-moon-o", "fa-sun-o");
    }
});

import { services as services } from "./data.js";
import { projects as projects } from "./data.js";

services.forEach((item) => {
    const content = `
    <div class="service__card shadow-hard relative overflow-hidden p-4 bg-surface rounded-sm flex" aria-labelledby="service__card-title">
        <div class="service__card-icon relative text-2xl">
            <i class="fa ${item.icon}" aria-hidden="true"></i>
        </div>
        <div class="service__card-body relative flow" style="--flow-space: .5em;">
            <h3 class="service__card-title relative font-heading text-2xl uppercase">${item.title}</h3>
            <p class="service__card-text relative">
                ${item.content}
            </p>
        </div>`;
    expertiseWrapper.innerHTML += content;
});

const projectWrapper = document.querySelector("#project-wrapper")

projects.forEach(item => {
    const content = `
    <div class="project-item flow bg-surface p-4" ${!item.isComplete?'title="To be developed"':''} style="--flow-space: 0.5em;">
        <div class="flex items-center" style="--gap: .25em;">
            <div class="project-icon bg-accent-500 text-neutral-100 flex items-center justify-center">
                <i class="fas fa-code"></i>
            </div>
            <h3 class="text-xl text-heading capitalize">${item.title}</h3>
        </div>
        <p class="text-sm text-regular">
            ${item.text}
        </p>
        <a href=${item.url} class="block">View Live <i class="fas fa-arrow-right"></i></a>
    </div>`;
    projectWrapper.innerHTML += content;
});
