'use strict'

// criar cards

import { listarCursos } from "./cursosApi.js";

let { cursos } = await listarCursos();


const criarCards = (indice) => {
    const cardsContainer = document.querySelector('#cursos');
    const cards = document.createElement('div');
    cards.classList.add('cards');
    cards.id = indice.sigla.toLowerCase();

    const icone = document.createElement('img');
    icone.classList.add('curso-icone');
    icone.src = indice.icone;

    const sigla = document.createElement('span');
    sigla.classList.add('nome');
    sigla.textContent = indice.sigla;

    cards.appendChild(icone);
    cards.appendChild(sigla);
    cardsContainer.appendChild(cards)

    cards.addEventListener('click', (elemento) => {
        elemento.preventDefault();
        let idCurso = cards.id;

        localStorage.setItem('curso', idCurso);

        location.href = './module/assets/html/class.html';
    });
}

cursos.forEach(criarCards)