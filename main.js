import './style.css'

// IMAGE SLIDER //
const slideBTNs = document.querySelectorAll('[data-slideBtn]');
const slideContainer = document.querySelector('[data-slideContainer]');
const slides = [...document.querySelectorAll('[data-slide]')];
let currentIndex = 0;
let isMoving = false;
// btn handleSlidesBtnClick //

function handleSlideBtnClick(e){
    // TODO: see if slider is moving //
    if(isMoving) return;
    isMoving = true;
    e.currentTarget.id === 'prev'
    ? currentIndex-- 
    :currentIndex++;
    slideContainer.dispatchEvent(new Event("sliderMove"))
}

// remove/add attribute function 
const removeDisabledAttributes = (els)=> els.forEach(el => el.removeAttribute('disabled'));
const addDisabledAttributes = (els)=> els.forEach(el => el.setAttribute('disabled', 'true'));

// eventListeners //
slideBTNs.forEach(btn => btn.addEventListener('click', handleSlideBtnClick))

slideContainer.addEventListener('sliderMove', ()=>{
    // translate the container to the right or the left
    slideContainer.style.transform = `translateX(-${currentIndex * slides[0].clientWidth}px)`

    // remove the disable attribute
     removeDisabledAttributes(slideBTNs);

     // re-enable disbale attribute if needed
    currentIndex === 0 && addDisabledAttributes([slideBTNs[0]])
})

slideContainer.addEventListener('transitionend', () => isMoving = false);

//disable imag drag event
document.querySelectorAll('[data-slide] img').forEach(img => img.ondragstart = () => false);

// intersection observer for slider
const slideObserver = new IntersectionObserver((slide)=>{
    if(slide[0].isIntersecting){
        addDisabledAttributes([slideBTNs[1]]);
    }
}, {threshold: .75})

slideObserver.observe(slides[slides.length - 1])

// form handle //
const contactForm = document.querySelector('#contact-form');
const contactBtn = document.querySelector('#contact-btn');
const contactInput = document.querySelector('#email');

// fake sending an email
function postEmailToDatabase(email){
    console.info(`your email is ${email}`);
    return new Promise(resolve => setTimeout(resolve, 2000));
}

// options for submit button
const contactBtnOptions = {
    pending: `
        <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm84,84H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z"></path></svg>
        <span class="uppercase tracking-wide animate-pulse">
            Sending...
        </span
    `,
    success: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M152.41,88.56l-89.6,88a12,12,0,0,1-16.82,0L7.59,138.85a12,12,0,0,1,16.82-17.13l30,29.46,81.19-79.74a12,12,0,0,1,16.82,17.12Zm96.15-17a12,12,0,0,0-17-.15L150.4,151.18l-7.88-7.74a12,12,0,0,0-16.82,17.12l16.29,16a12,12,0,0,0,16.82,0l89.6-88A12,12,0,0,0,248.56,71.59Z"></path></svg>
        <span>Thank you!</span>
    `,
}

async function handleFormSubmit(e) { 
    e.preventDefault();
    addDisabledAttributes([contactForm, contactBtn]);
    contactBtn.innerHTML = contactBtnOptions.pending;
    const userEmail =  contactInput.value;
    contactInput.style.display = 'none';
    await postEmailToDatabase(userEmail);
    contactBtn.innerHTML = contactBtnOptions.success;
}

contactForm.addEventListener('submit', handleFormSubmit);

// fade up observer //
function fadeUpObserverCallback(elseToWatch){
    elseToWatch.forEach( el =>{
        if(el.isIntersecting){
            el.target.classList.add('faded')
            fadeUpObserver.unobserve(el.target);
            el.target.addEventListener('transitioned', ()=>{
                el.target.classList.remove('fade-up', 'faded');
            }, { once:true })
        }
    })
}

const fadeUpObserverOptions = {
    threshold: .6,
}

const fadeUpObserver = new IntersectionObserver(fadeUpObserverCallback,
     fadeUpObserverOptions)

document.querySelectorAll('.fade-up').forEach(item => {
    fadeUpObserver.observe(item);
})
