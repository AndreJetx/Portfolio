import { english } from './Ingles.js';
import { espanhol } from './espanhol.js';
import { handleToggleChange } from './index.js';
import { updateNavbarStyle } from './index.js';
import { openMenu } from './index.js';
import { closeMenu } from './index.js';

export const idioma = () => {
	let switchLanguageButtonEN = document.getElementById('switchLanguageen');
	let contentDiv = document.getElementById('body');
	let switchLanguageButtonES = document.getElementById('switchLanguageesp');


	switchLanguageButtonEN.addEventListener('click', () => {
		contentDiv.innerHTML = english;
		idioma();
		handleToggleChange();
		updateNavbarStyle();
		openMenu();
		closeMenu();
		
	});

	switchLanguageButtonES.addEventListener('click', () => {
		contentDiv.innerHTML = espanhol;
		idioma();
		handleToggleChange();
		updateNavbarStyle();
		openMenu();
		closeMenu();
	});
};

