'use strict'

import { getAlunosByCurso } from "./alunosApi.js";

import { listarCursos } from './cursosApi.js';

const curso = localStorage.getItem('curso');

let { cursos } = await listarCursos();
let alunosList = await getAlunosByCurso(curso);

let titleContainer = '';

cursos.forEach(item => {
    if (item.sigla.toLowerCase() == curso) {
        titleContainer = item.nome.split(' - ')[1].replace('Técnico em ', '');
    }
});

const inserirTitle = () => {
    const title = document.querySelector('#subject-name');
    title.textContent = titleContainer;
}
inserirTitle();

const createCardsAlunos = async (item) => {
    const container = document.querySelector('.cards-container');
    const card = document.createElement('div');
    card.classList.add('card');

    if (item.status.toLowerCase() ==  'cursando') {
        card.classList.add('amarelo');
    } else if (item.status.toLowerCase() == 'finalizado') {
        card.classList.add('azul');
    }
    
    card.innerHTML = `
        <img src="${item.foto}" alt="Foto do Estudante" class="student-photo">
        <span class="student-name">${item.nome.toUpperCase()}</span>
    `;

    container.appendChild(card);

    card.addEventListener('click', (element) => {
        element.preventDefault();
        const studentEnrollment = index.matricula;

        localStorage.setItem('enrollment', studentEnrollment);

        location.href = './module/assets/html/student.html';
    });
}
const limparCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.remove())
}

const filterStatusSelect = document.querySelector('#status-select');
let statusSelectValor = document.querySelector('#status-select').value;

alunosList.forEach(createCardsAlunos);
/****************************************************************************************************
// const sanitizeOptions = () => {
//     const option = document.querySelectorAll('.year-option');
//     option.forEach((option) => option.remove())
// }

// const yearSelectInput = document.querySelector('#conclusion-select'); //
// let yearSelectInputValue = document.querySelector('#conclusion-select').value; //


// const createYearsOptions = async (year) => { 
//     const yearOption = document.createElement('option');
//     yearOption.value = year;
//     yearOption.textContent = year;
//     yearOption.classList.add('year-option');
    
//     yearSelectInput.appendChild(yearOption);
// }

// let years = await getYears(course, statusSelectValue);
// years.forEach(createYearsOptions); //

// statusFilterSelect.addEventListener('change', async () => {
//     statusSelectValue = document.querySelector('#status-select').value;
//     yearSelectInputValue = document.querySelector('#conclusion-select').value;

//     studentsList = await filterStudentsByStatusAndConclusionDate(course, statusSelectValue, yearSelectInputValue);
//     years = await getYears(course, statusSelectValue);
//     sanitizeOptions();
//     years.forEach(createYearsOptions);


//     sanitizeCards(); // limpando o container dos cards

//     if (studentsList) {
//         studentsList.forEach((e) => createStudentsCards(e)) // popula
//     }
// });

// yearSelectInput.addEventListener('change', async () => {
//     yearSelectInputValue = document.querySelector('#conclusion-select').value;
//     statusSelectValue = document.querySelector('#status-select').value;
    
//     studentsList = await filterStudentsByStatusAndConclusionDate(course, statusSelectValue, yearSelectInputValue);
//     years = await getYears(course, statusSelectValue);
//     sanitizeOptions();
//     years.forEach(createYearsOptions);
    
//     sanitizeCards();
    
//     if (studentsList) {
//         studentsList.forEach((e) => createStudentsCards(e))
//     }
// });
 ***************************************************************************************************/
