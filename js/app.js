const primaryNav=document.getElementById("primary-nav"),navToggle=document.getElementById("nav-toggle"),serviceCardDeck=document.getElementById("service__card-deck"),caseStudyWrapper=document.getElementById("case-study__wrapper");navToggle.addEventListener("click",()=>{primaryNav.hasAttribute("data-visible")?navToggle.setAttribute("aria-expanded",!1):navToggle.setAttribute("aria-expanded",!0),primaryNav.toggleAttribute("data-visible")});const services=[{id:1,title:"responsive",icon:"fa-tablet",content:"Gone those days when there was no term 'responsiveness', with the rise of too many modern devices responsiveness is must."},{id:2,title:"new technology",icon:"fa-code",content:"I always prefer to work with new and stable frameworks to provide clients better and modernize experience."},{id:3,title:"ui/ux",icon:"fa-search",content:"I make sure that user interface and experience are pleasant and less complex without compromising the aesthetics."},],caseStudies=[{id:1,title:"apna college",pageUrl:"case-studies/apna-college.html",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:'Clone Project on "Apna College" with slight touches, Still under the work. <strong>NOTE: This is just a clone</strong>.'},{id:2,title:"coming soon",pageUrl:"index.html",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"Nothing to see yet."},{id:3,title:"coming soon",pageUrl:"index.html",imgUrl:"https://media.istockphoto.com/id/944549962/photo/abstract-colored-geometric-shapes-for-web-design-3d-render.jpg?b=1&s=170667a&w=0&k=20&c=pjospMeH9YD4zwKMltDRlvhHFougaEHrjkEg0A_j3MM=",content:"Nothing to see yet."}];services.forEach((e,t)=>{let s=document.createElement("div");s.classList="card-body";let a=`
    <div class="service__card p-4 bg-neutral-300 flex" aria-labelledby="service__card-title">
        <div class="service__card-icon">
            <i class="fa ${e.icon}" aria-hidden="true"></i>
        </div>
        <div class="service__card-body flow" style="--flow-space: .5em;">
            <h3 class="service__card-title uppercase">${e.title}</h3>
            <p class="service__card-text">
                ${e.content}
            </p>
        </div>
    </div>`;serviceCardDeck.innerHTML+=a}),caseStudies.forEach((e,t)=>{let s=`
    <a href=${e.pageUrl} target="_blank" class="case-study__item decoration-none bg-neutral-200">
        <img src=${e.imgUrl}
            class="case-study__image" alt="">
        <div class="case-study__body">
            <h3 class="case-study__title uppercase text-primary-400">${e.title}</h3>
            <p class="text-neutral-900">
                ${e.content}
            </p>
        </div>
    </a>`;caseStudyWrapper.innerHTML+=s});