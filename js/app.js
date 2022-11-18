const primaryNav=document.getElementById("primary-nav"),navToggle=document.getElementById("nav-toggle"),serviceCardDeck=document.getElementById("service__card-deck"),caseStudyWrapper=document.getElementById("case-study__wrapper"),skillItem=document.querySelectorAll(".skill__carousel-item"),themeToggle=document.getElementById("theme-toggle");navToggle.addEventListener("click",()=>{primaryNav.hasAttribute("data-visible")?navToggle.setAttribute("aria-expanded",!1):navToggle.setAttribute("aria-expanded",!0),primaryNav.toggleAttribute("data-visible")}),themeToggle.addEventListener("click",()=>{let e=document.body,t=document.getElementById("theme-icon");e.classList.contains("light")?(e.classList.replace("light","dark"),t.classList.replace("fa-solid","fa-regular")):(e.classList.replace("dark","light"),t.classList.replace("fa-regular","fa-solid"))});const services=[{id:1,title:"responsive",icon:"fa-tablet",content:"Gone those days when there was no term 'responsiveness', with the rise of too many modern devices responsiveness is must."},{id:2,title:"new technology",icon:"fa-code",content:"I always prefer to work with new and stable frameworks to provide clients better and modernize experience."},{id:3,title:"ui/ux",icon:"fa-search",content:"I make sure that user interface and experience are pleasant and less complex without compromising the aesthetics."},],caseStudies=[{id:1,title:"apna college",pageUrl:"case-studies/apna-college.html",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:'Clone Project on "Apna College" with slight touches, Still under the work. <strong>NOTE: This is just a clone</strong>.'},{id:2,title:"manage landing page",pageUrl:"#",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"<strong>Technical Issue!</strong>, Project will be back soon."},{id:3,title:"coming soon",pageUrl:"#",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"Nothing to see yet."}];services.forEach((e,t)=>{let a=document.createElement("div");a.classList="card-body";let s=`
    <div class="service__card p-4 bg-background rounded-sm flex" aria-labelledby="service__card-title">
        <div class="service__card-icon text-2xl">
            <i class="fa ${e.icon}" aria-hidden="true"></i>
        </div>
        <div class="service__card-body flow" style="--flow-space: .5em;">
            <h3 class="service__card-title text-heading font-heading leading-none text-2xl uppercase">${e.title}</h3>
            <p class="service__card-text">
                ${e.content}
            </p>
        </div>
    </div>`;serviceCardDeck.innerHTML+=s}),caseStudies.forEach((e,t)=>{let a=`
    <a href=${e.pageUrl} target="_blank" class="case-study__item decoration-none bg-surface rounded-sm">
        <img src=${e.imgUrl}
            class="case-study__image" alt="">
        <div class="case-study__body text-background flow" style="--flow-space: .5em;">
            <h3 class="case-study__title leading-none text-heading font-heading text-2xl text-accent-500 uppercase">${e.title}</h3>
            <p class="text-regular">
                ${e.content}
            </p>
        </div>
    </a>`;caseStudyWrapper.innerHTML+=a});
