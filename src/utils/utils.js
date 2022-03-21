//vertical scroll
function setElementHeight(el){
  const top = el.getBoundingClientRect().top;
  el.style.maxHeight = (document.documentElement.clientHeight - top)+'px';
}
export function addScroll(){
 const scrollElements = document.querySelectorAll('.vScroll')
  scrollElements.forEach(el => {
    setElementHeight(el);
  });
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
