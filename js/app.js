const primaryNav=document.getElementById("primary-nav"),navToggle=document.getElementById("nav-toggle"),serviceCardDeck=document.getElementById("service__card-deck"),caseStudyWrapper=document.getElementById("case-study__wrapper"),skillItem=document.querySelectorAll(".skill__carousel-item"),themeToggle=document.getElementById("theme-toggle");navToggle.addEventListener("click",()=>{primaryNav.hasAttribute("data-visible")?navToggle.setAttribute("aria-expanded",!1):navToggle.setAttribute("aria-expanded",!0),primaryNav.toggleAttribute("data-visible")}),themeToggle.addEventListener("click",()=>{const a=document.body,b=document.getElementById("theme-icon");a.classList.contains("light")?(a.classList.replace("light","dark"),b.classList.replace("fa-solid","fa-regular")):(a.classList.replace("dark","light"),b.classList.replace("fa-regular","fa-solid"))});const services=[{id:1,title:"responsive",icon:"fa-tablet",content:"Gone those days when there was no term 'responsiveness', with the rise of too many modern devices responsiveness is must."},{id:2,title:"new technology",icon:"fa-code",content:"I always prefer to work with new and stable frameworks to provide clients better and modernize experience."},{id:3,title:"ui/ux",icon:"fa-search",content:"I make sure that user interface and experience are pleasant and less complex without compromising the aesthetics."}],caseStudies=[{id:1,title:"apna college",pageUrl:"case-studies/apna-college.html",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"Clone Project on \"Apna College\" with slight touches, Still under the work. <strong>NOTE: This is just a clone</strong>."},{id:2,title:"manage landing page",pageUrl:"#",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"<strong>Technical Issue, Project will be back soon.</strong>"},{id:3,title:"coming soon",pageUrl:"#",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"Nothing to see yet."}];services.forEach((a,b)=>{const c=document.createElement("div");c.classList="card-body";const d=`
    <!-- service card ${b+1} -->
    <div class="service__card shadow-soft relative overflow-hidden p-4 bg-background rounded-sm flex" aria-labelledby="service__card-title">
        <div class="service__card-icon relative text-2xl">
            <i class="fa ${a.icon}" aria-hidden="true"></i>
        </div>
        <div class="service__card-body relative flow" style="--flow-space: .5em;">
            <h3 class="service__card-title relative font-heading text-2xl uppercase">${a.title}</h3>
            <p class="service__card-text relative">
                ${a.content}
            </p>
        </div>
    </div><!-- /.service card ${b+1} -->`;serviceCardDeck.innerHTML+=d}),caseStudies.forEach((a,b)=>{const c=`
    <!-- case study ${b+1} -->
    <a style="--focus-bg:var(--clr-background);--focus-otl:var(--clr-accent-700);" href=${a.pageUrl} target="_blank" class="case-study__item shadow-soft relative isolate overflow-hidden decoration-none bg-surface rounded-sm">
        <img src=${a.imgUrl}
            class="case-study__image w-full object-cover" alt="">
        <div class="case-study__body text-background flow" style="--flow-space: .5em;">
            <h3 class="case-study__title text-heading font-heading text-2xl text-accent-500 leading-none uppercase">${a.title}</h3>
            <p class="text-regular">
                ${a.content}
            </p>
        </div>
    </a><!-- /.case study ${b+1} -->`;caseStudyWrapper.innerHTML+=c});
