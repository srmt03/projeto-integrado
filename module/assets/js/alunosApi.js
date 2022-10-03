'use strict'

// consumo de api

//Pegar alunos do mesmo curso
const getAlunosByCurso = async (curso) => {
    const url = `http://localhost:3030/alunos/curso/${curso}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;

    ///alunos/curso/:nome
}
//Pegar alunos do mesmo curso filtrando pelo ano de conclusao//
const getAno = async (ano, nomeCurso) => {
    const url = `http://localhost:3030/alunos/anoConclusao/${ano}/curso/${nomeCurso}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;

    ///alunos/anoConclusao/:ano/curso/:nomeCurso
}
//Pegar alunos do mesmo curso pelo status//
const getAlunosByStatus = async (nomeCurso, statusAluno) => {
    const url = `http://localhost:3030/alunos/cursos/${nomeCurso}/status/${statusAluno}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;

    ///alunos/cursos/:nomeCurso/status/:statusAluno
}
//Pegar alunos do mesmo curso filtrando pelo status e ano de conclusao//
const filterAlunosByStatusEAnoConclusao = async (nomeCurso, statusAluno, ano) => {
    const url = `http://localhost:3030/alunos/cursos/${nomeCurso}/status/${statusAluno}/anoConclusao/${ano}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;

    ///alunos/anoDeConclusao/:ano/cursos/:nomeCurso/status/:status
}

export {
    getAlunosByCurso,
    filterAlunosByStatusEAnoConclusao,
    getAno,
    getAlunosByStatus
};
