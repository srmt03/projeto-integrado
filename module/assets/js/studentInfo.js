'use strict'

import { relatorioAluno } from "./studentApi.js";

const matricula = localStorage.getItem('informacoes')

const relatorio = await relatorioAluno(matricula);
console.log(relatorio);

const createCardAluno = async (item) => {
    const container = document.querySelector('.profile-aluno');
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = 
    `
        <img src="${item.foto}" alt="Foto do Estudante" class="aluno-photo">
        <span class="aluno-name">${item.nome.toUpperCase()}</span>
    `
    container.appendChild(card);
}
relatorio.forEach(createCardAluno);

const createNotasStudent = async (item) => {
    const container = document.querySelector('.notas');
    const div = document.createElement('div');
}