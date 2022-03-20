//vertical scroll
function setElementHeight(el){
  const top = el.getBoundingClientRect().top;
  console.log('top', top)
  console.log(document.documentElement.clientHeight)
  el.style.maxHeight = (document.documentElement.clientHeight - top)+'px';
}
export function addScroll(){
  const scrollElements = document.querySelectorAll('.vScroll')
  scrollElements.forEach(el => {
    setElementHeight(el);
  })
  console.log(scrollElements);
}

// smooth scroll
export function setTabsListeners() {
  const navLinks = document.querySelectorAll('.tabLink');
  console.log( 1, navLinks)
  for (let link of navLinks) {
    link.addEventListener('click', smoothScroll);
  }
}
function smoothScroll(evt) {
  evt.preventDefault()
  console.log(evt.target.closest('.tabLink'))
  const blockID = evt.target.closest('.tabLink').getAttribute('href').slice(1);
  console.log(blockID)
  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}