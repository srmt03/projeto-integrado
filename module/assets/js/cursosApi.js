'use strict'

//consumo de api

const listarCursos = async () => {
    const url = `http://localhost:3030/cursos`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados;
}

export {listarCursos};