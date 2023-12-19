const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");



document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
      updateNavbarStyle();
    });
  });
  
  function updateNavbarStyle() {
    var nav = document.querySelector(".nav");
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  function onScroll() {
    showNavOnScroll();
    showBackToTopButtonOnScroll();
  
    activateMenuAtCurrentSection(sobre-mim);
    activateMenuAtCurrentSection(projetos);
    activateMenuAtCurrentSection(conhecimentos);
    activateMenuAtCurrentSection(contato);
  }

  function activateMenuAtCurrentSection(section) {
    const targetLine = scrollY + innerHeight / 2;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
  
    const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
    const sectionEndsAt = sectionTop + sectionHeight;
    const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;
  
    const sectionBoundaries =
      sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;
  
    const sectionId = section.getAttribute("id");
    const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);
  
    menuElement.classList.remove("active");
  
    if (sectionBoundaries) {
      menuElement.classList.add("active");
    }
  }

  function showNavOnScroll() {
    if (scrollY > 0) {
      navigation.classList.add("scroll");
    } else {
      navigation.classList.remove("scroll");
    }
  }
  
  function showBackToTopButtonOnScroll() {
    if (scrollY > 550) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }
  
  openMenu();
  function openMenu() {
    const openBtns = document.querySelectorAll(".open");
    openBtns.forEach((e) => {
      e.addEventListener("click", () => {
        document.body.classList.add("menu-expanded");
      });
    });
  }
  
  closeMenu();
  function closeMenu() {
    const closeBtns = document.querySelectorAll(".close");
    closeBtns.forEach((e) => {
      e.addEventListener("click", () => {
        document.body.classList.remove("menu-expanded");
      });
    });
  }
  
  ScrollReveal({
    origin: "bottom",
    distance: "50px",
    duration: 1000,
  }).reveal(
    `
    #home, 
    #home img, 
    #sobre-mim, 
    #sobre-mim header, 
    #sobre-mim p,
    #sobre-mim img,
    #projetos,
    #projetos header,
    #projetos .card,
    #conhecimentos,
    #conhecimentos header,
    #conhecimentos .card,
    #contato,
    #contato header
    `
  );
  
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
  });