import { english } from './ingles.js';
import { espanhol } from './espanhol.js';

export const teste = () => {
	var switchLanguageButtonEN = document.getElementById('switchLanguageen');
	var contentDiv = document.getElementById('body');
	var switchLanguageButtonES = document.getElementById('switchLanguageesp');
	console.log('aaa');

	switchLanguageButtonEN.addEventListener('click', () => {
		console.log('Botão EN clicado');
		contentDiv.innerHTML = english;
		teste();
	});

	switchLanguageButtonES.addEventListener('click', () => {
		console.log('Botão ES clicado');
		contentDiv.innerHTML = espanhol;
		teste();
	});
};
