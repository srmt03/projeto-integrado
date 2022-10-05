'use strict'

import { getAlunosByCurso, getAno, getAlunosByStatus, filterAlunosByStatusEAnoConclusao } from "./alunosApi.js";

import { listarCursos } from './cursosApi.js';

const curso = localStorage.getItem('curso');

let { cursos } = await listarCursos();
let { alunos } = await getAlunosByCurso(curso);

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
        card.classList.add('azul');
    } else if (item.status.toLowerCase() == 'finalizado') {
        card.classList.add('amarelo');
    }
    
    card.innerHTML = 
    `
        <img src="${item.foto}" alt="Foto do Estudante" class="student-photo">
        <span class="student-name">${item.nome.toUpperCase()}</span>
    `;

    container.appendChild(card);

    card.addEventListener('click', (element) => {
        element.preventDefault();
        const alunoInfos = item.matricula;

        localStorage.setItem('informacoes', alunoInfos);

        location.href = '../html/student.html';
    });
}
alunos.forEach(createCardsAlunos);

const limparCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.remove())
}

const alunosAnos = (alunos) => {
    const ano = []
    alunos.forEach(aluno => {
        if (!ano.includes(aluno.anoConclusao)) {
          ano.push(aluno.anoConclusao)  
        };
    })
    return ano
}

const anoSelectInput = document.querySelector('#conclusion-select'); 
let anoSelectInputValor = document.querySelector('#conclusion-select').value; 

let anos = alunosAnos(alunos)

const createOptionsAno = async (anos) => {
    anos.forEach(ano => {
        const anoOption = document.createElement('option');
        anoOption.value = ano;
        anoOption.textContent = ano;
        anoOption.classList.add('ano-option');
    
        anoSelectInput.appendChild(anoOption);
    }) 
}
createOptionsAno(anos)

const limparOptions = () => {
    const option = document.querySelectorAll('.ano-option');
    option.forEach((option) => option.remove())
}

const filterStatusSelect = document.querySelector('#status-select');
let statusSelectValor = document.querySelector('#status-select').value;

// filterStatusSelect.addEventListener('change', async () => {
//     statusSelectValor = document.querySelector('#status-select').value
//     limparCards();
//     if (statusSelectValor == 'status') {
//         alunos.forEach(createCardsAlunos);
//     } else {
//         let { statusAluno } = await getAlunosByStatus(curso, statusSelectValor);
//         statusAluno.forEach(createCardsAlunos);
//     }
// });


filterStatusSelect.addEventListener('change', async () => {
    statusSelectValor = document.querySelector('#status-select').value;
    anoSelectInputValor = document.querySelector('#conclusion-select').value;
    limparOptions();
    createOptionsAno(anos)
    limparCards();
    if (statusSelectValor == 'status' && anoSelectInputValor == 'anoConclusao') {
        alunos.forEach(createCardsAlunos);
    } else if (statusSelectValor == 'status') {
        let { alunosAno } = await getAno(curso, anoSelectInputValor);
        alunosAno.forEach(createCardsAlunos);    
    } else if (anoSelectInputValor == 'anoConclusao') {
        let { statusAluno } = await getAlunosByStatus(curso, statusSelectValor);
        statusAluno.forEach(createCardsAlunos);    
    } else {
        let { alunosStatus } = await filterAlunosByStatusEAnoConclusao(curso, statusSelectValor, anoSelectInputValor );
        alunosStatus.forEach(createCardsAlunos);    
    }
});


// anoSelectInput.addEventListener('change', async () => {
//     anoSelectInputValor = document.querySelector('#conclusion-select').value;
//     statusSelectValor = document.querySelector('#status-select').value;
//     limparOptions();
//     createOptionsAno(anos)
//     limparCards();
//     if (statusSelectValor == 'status' && anoSelectInputValor == 'anoConclusao') {
//         alunos.forEach(createCardsAlunos);
//     } else if (statusSelectValor == 'status') {
//         let { alunosAno } = await getAno(curso, anoSelectInputValor);
//         alunosAno.forEach(createCardsAlunos);    
//     } else if (anoSelectInputValor == 'anoConclusao') {
//         let { statusAluno } = await getAlunosByStatus(curso, statusSelectValor);
//         statusAluno.forEach(createCardsAlunos);    
//     } else {
//         let { alunosStatus } = await filterAlunosByStatusEAnoConclusao(curso, statusSelectValor, anoSelectInputValor );
//         alunosStatus.forEach(createCardsAlunos);    
//     }
// });

// anoSelectInput.addEventListener('change', async () => {
//     anoSelectInputValor = document.querySelector('#conclusion-select').value;
//     console.log(anoSelectInputValor);
//     limparCards();
//     if (anoSelectInputValor == 'anoConclusao') {    
//         alunos.forEach(createCardsAlunos);
//     } else {
//         let { alunosAno } = await getAno(anoSelectInputValor, curso);
//         alunosAno.forEach(createCardsAlunos);
//     }
// });