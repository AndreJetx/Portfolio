import { idioma } from './languageButtons.js';

document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('scroll', function () {
		updateNavbarStyle();
	});
  handleToggleChange();
});

export function updateNavbarStyle() {
	var nav = document.querySelector('.nav');
	var scrollPosition = window.scrollY;

	if (scrollPosition > 10) {
		nav.classList.add('scroll');
	} else {
		nav.classList.remove('scroll');
	}
}

openMenu();
export function openMenu() {
	const openBtns = document.querySelectorAll('.open');
	openBtns.forEach((e) => {
		e.addEventListener('click', () => {
			document.body.classList.add('menu-expanded');
		});
	});
}

closeMenu();
export function closeMenu() {
	const closeBtns = document.querySelectorAll('.close');
	closeBtns.forEach((e) => {
		e.addEventListener('click', () => {
			document.body.classList.remove('menu-expanded');
		});
	});
}

export const handleToggleChange = () => {
  const toggle = document.querySelector('#sw-checkbox');
  const images = document.querySelectorAll('.imagem-home img');
  const lightModePaths = [
    './src/img/eat-home-lm.png',
    './src/img/sleep-home-lm.png',
    './src/img/code-home-lm.png',
    './src/img/repeat-home-lm.png',
  ];

  const darkModePaths = [
    './src/img/eat-home-dm.png',
    './src/img/sleep-home-dm.png',
    './src/img/code-home-dm.png',
    './src/img/repeat-home-dm.png',
  ];

  const toggleChangeHandler = () => {
    const isLightMode = document.body.classList.toggle('light-mode');

    images.forEach((image, index) => {
      image.src = isLightMode ? lightModePaths[index] : darkModePaths[index];
    });
  };
  toggle.addEventListener('change', toggleChangeHandler);

};

document.addEventListener('DOMContentLoaded', function () {
	idioma();
});
