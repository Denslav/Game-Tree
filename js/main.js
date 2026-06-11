window.addEventListener("DOMContentLoaded", function () {
  //Fixed header
  window.addEventListener("scroll", function () {
    const screenWidth = window.innerWidth; 
    const header = document.querySelector(".header");
    const hero = document.querySelector(".hero");
    const aheader = document.querySelector(".fixed-header");
    
    if (screenWidth > 768) {
      if (window.scrollY > 0) {
        header.classList.add("fixed-header");
        hero.classList.add("hero-top");
      } else {
        header.classList.remove("fixed-header");
        hero.classList.remove("hero-top");
      }
    
      if (window.scrollY > 100) {
        aheader.classList.add("active-header");
      } else {
        aheader.classList.remove("active-header");
      }
    }
  });
  

  //Header btn
  const headerBtn = document.querySelector(".header__btn .btn");

  function updateButtonText() {
    const windowWidth = window.innerWidth;
    const breakpoint = 992;

    if (windowWidth <= breakpoint) {
      headerBtn.innerHTML = '<div class="btn__text">Join</div>';
    } else {
      headerBtn.innerHTML =
        '<img src="./img/btn_img.png" alt=""><div class="btn__text">Open GameTree</div>';
    }
  }

  updateButtonText();
  window.addEventListener("resize", updateButtonText);

  // Mobile menu
  const burgerButton = document.getElementById("burgerButton");
  const headerMenu = document.querySelector(".header__menu");
  const header = document.querySelector(".header");
  let crossed = false;

  burgerButton.addEventListener("click", function () {
    crossed = !crossed;

    if (crossed) {
      burgerButton.classList.add("crossed");
      headerMenu.classList.add("show-menu");
      header.classList.add("header__bg");
    } else {
      burgerButton.classList.remove("crossed");
      headerMenu.classList.remove("show-menu");
      header.classList.remove("header__bg");
    }
  });

  //Accordion
  const questBtns = document.querySelectorAll(".quest__btn");

  questBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const questItem = btn.closest(".quest__item");

      const questItemBottom = questItem.querySelector(".quest__item-bottom");

      questItemBottom.classList.toggle("quest__item-show");

      const questBtnItemAfter = btn.querySelector(".quest__btn-item");

      questBtnItemAfter.classList.toggle("rotate");
    });
  });


  // Slider
  const slider = document.querySelector(".reviews__slider-wrapper");
  const slides = document.querySelectorAll(".reviews__slider-item");
  const prevBtn = document.querySelector(".reviews__slider_btn-prew");
  const nextBtn = document.querySelector(".reviews__slider_btn-next");
  const slideCount = slides.length;
  let slideIndex = 0;
  let isDragging = false;
  let startPosX = 0;
  let currentTranslate = 0;

  prevBtn.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    slide();
  });

  nextBtn.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slideCount;
    slide();
  });

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosX = e.clientX;
    currentTranslate = -slideIndex * slider.clientWidth;
  });

  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPosX = e.touches[0].clientX;
    currentTranslate = -slideIndex * slider.clientWidth;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dragDistance = e.clientX - startPosX;
    const translate = currentTranslate + dragDistance;
    slider.style.transform = `translateX(${translate}px)`;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dragDistance = e.touches[0].clientX - startPosX;
    const translate = currentTranslate + dragDistance;
    slider.style.transform = `translateX(${translate}px)`;
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    const dragDistance = startPosX - e.clientX;
    if (dragDistance > 100) {
      slideIndex = (slideIndex + 1) % slideCount;
    } else if (dragDistance < -100) {
      slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    }
    slide();
  });

  slider.addEventListener("touchend", () => {
    isDragging = false;
    const dragDistance = startPosX - e.touches[0].clientX;
    if (dragDistance > 100) {
      slideIndex = (slideIndex + 1) % slideCount;
    } else if (dragDistance < -100) {
      slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    }
    slide();
  });

  const slide = () => {
    const imageWidth = slider.clientWidth;
    const slideOffset = -slideIndex * imageWidth;
    slider.style.transform = `translateX(${slideOffset}px)`;
  };

  slide();
});


/*Pop Up*/
document.addEventListener('DOMContentLoaded', function() {
  // Таймер для показа попапа через 3 секунды после загрузки страницы
  setTimeout(function() {
      let popup = document.querySelector('.g-popup');
      let body = document.body;
      if (popup) {
          popup.classList.add('g-popup__show');
          body.classList.add('no-scroll'); // Добавляем класс для блокировки прокрутки
      }
  }, 3000);

  // Обработчик клика для кнопки закрытия попапа
  document.addEventListener('click', function(event) {
      let closeBtn = event.target.closest('.g-popup__btn-close');
      let popup = document.querySelector('.g-popup');
      let body = document.body;

      if (closeBtn && popup) {
          popup.classList.remove('g-popup__show');
          body.classList.remove('no-scroll'); // Убираем класс для разблокировки прокрутки
      }
  });

  // Предотвращаем прокрутку на мобильных устройствах при открытом попапе
  document.addEventListener('touchmove', function(event) {
    if (document.body.classList.contains('no-scroll')) {
        event.preventDefault(); // Предотвращаем прокрутку на мобильных устройствах
    }
  }, { passive: false });
});