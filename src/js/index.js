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
        nav.classList.add("scroll");
      } else {
        nav.classList.remove("scroll");
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
  
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
  });