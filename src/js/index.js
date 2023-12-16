document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
      updateNavbarStyle();
    });
  });
  
  function updateNavbarStyle() {
    var nav = document.querySelector(".nav");
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }