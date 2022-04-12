//vertical scroll
const body = document.querySelector('body');
function setElementHeight(el, bottomEl){
  const marginBottom = 40;
  const top = el.getBoundingClientRect().top;
  const bottomHeight = bottomEl ? (body.offsetHeight - bottomEl.getBoundingClientRect().top) : marginBottom;
  el.style.maxHeight = Math.floor(document.documentElement.clientHeight - top -bottomHeight )+'px';
}
export function addScroll(){
 const ingredientsList = document.querySelector('.ingredientsScroll');
    setElementHeight(ingredientsList, null);
    const constructor = document.querySelector('.constructorScroll')
    const bottomEl = document.querySelector('.bottom');
  setElementHeight(constructor, bottomEl);
}

// smooth scroll
export function setTabsListeners() {
  const navLinks = document.querySelectorAll('.tabLink');
 
  for (let link of navLinks) {
    link.addEventListener('click', smoothScroll);
  }
}
function smoothScroll(evt) {
  evt.preventDefault();
  const blockID = evt.target.closest('.tabLink').getAttribute('href').slice(1);
 
  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
