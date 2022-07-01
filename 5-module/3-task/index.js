function initCarousel() {
  
  let leftBtn = document.querySelector('.carousel__arrow_left');
  let rightBtn = document.querySelector('.carousel__arrow_right');

  let carousel = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');

  let position = 1;
  let size = slides.length;
  let width = carousel.offsetWidth;



  function displayCheck () {
    
    if (position === 1) {
      leftBtn.style.display = 'none'
    } else {
      leftBtn.style.display = ''
    }
    if (position === 4) {
      rightBtn.style.display = 'none'
    } else {
      rightBtn.style.display = ''
    }
  }

  displayCheck ();
  

  function checkAndMove () {
    for (let slide of slides) {
      carousel.style.transform = `translateX(-${width * (position - 1)}px)`
    }
    displayCheck ()
  }


  rightBtn.addEventListener('click', () => {
    position++;
    if (position >= size) {
      position = size
    }
    checkAndMove ();
  })


  leftBtn.addEventListener('click', () => {
    position--;
    if (position >= size) {
      position = size
    }
    checkAndMove ();
  })
}