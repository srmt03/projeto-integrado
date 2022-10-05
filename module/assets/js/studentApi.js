'use strict'

// consumo de api

//Pegar alunos do mesmo curso
const relatorioAluno = async (idMatricula) => {
    const url = `http://localhost:3030/aluno/matricula/${idMatricula}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;

    ///aluno/matricula/:matriculaAluno
}
export { relatorioAluno };