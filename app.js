/***********************************************************************************************************************
 * Objetivo: Criar as rotas EndPoints do sistema 
 * Autor: Samuel Matos
 * Data de Criacao: 15/09/2022
 * Data de Modificacao: 19/09/2022
 * Data de Modificacao: 26/09/2022
 * Versao: 1.0 *
************************************************************************************************************************/
//Import da biblioteca do express para criar a API
const express = require('express');
//Import da biblioteca do cors para manipullar as permissoes do http
const cors = require('cors');
//Importbda biblioteca do body-parser que ira manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');
//Cria um objeto chamado app que sera especialista nas funcoes do express
const app = express();
//Import do arquivo de functions do sistema
const { getCursos, getCursoByNome } = require("./module/cursos.js")
const { getListAlunos, filterAlunos, getAlunosCursos, anoConclusao, alunoStatus } = require("./module/alunos.js")

app.use((request, response, next) => {
    //Permite especificar quem serao os IPs que podem acessar a API ('*' - significa todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Permite especificar quais serao os verbos ou metodos qur a API ira reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors());
    
    next();
});
//EndPoint: Listar cursos pelo nome //Status: Funcionando // Desnecessario
app.get('/cursos/nome/:nome', cors(), async function (resquest, response, next) {
    let id = resquest.params.nome
    let curso = getCursoByNome(id)
    let cursoJSON = {}

    if (curso) {
        cursoJSON.curso = curso
        response.status(200)
        response.json(cursoJSON)
    } else {
        response.status(404)
    }
})
//EndPoint: Listar todos os alunos // Status: Funcionando // Desnecessario
app.get('/alunos', cors(), async function (request, response, next) {
    let alunos = getListAlunos()
    let alunosJSON = {}

    if (alunos) {
        alunosJSON.alunos = alunos
        response.status(200)
        response.json(alunosJSON)
    } else {
        response.status(404)
    }
})

/*
* EndPoints Funcionias neste Projeto
*/

//EndPoints page1//

//EndPoint: Listar todos os cursos // Status: Funcionando // Em consumo ...
app.get('/cursos', cors(), async function (resquest, response, next) {
    let cursos = getCursos()
    let cursosJSON = {}

    if (cursos) {
        cursosJSON.cursos = cursos
        response.status(200)
        response.json(cursosJSON)
    } else {
        response.status(404)
    }
})

//EndPoints page2//

//EndPoint: Listar alunos do mesmo curso // Status: Funcionando
app.use('/alunos/curso/:nome', cors(), async function (request, response, next) {
    let id = request.params.nome
    let listAlunosCurso = getAlunosCursos(id)
    let alunosJSON = {}

    if (listAlunosCurso) {
        alunosJSON.alunos = listAlunosCurso
        response.status(200)
        response.json(alunosJSON)
    } else {
        response.status(404)
    }

})
//EndPoint: Listar todos alunos do mesmo Curso de acordo com Status (Finalizado ou Cursando) // Status: Funcionando
app.use('/alunos/cursos/:nomeCurso/status/:statusAluno', cors(), async function (request, response, next) {
    let curso = request.params.nomeCurso
    let status = request.params.statusAluno

    let listAlunosCurso = getAlunosCursos(curso)
    let listAlunosStatus = alunoStatus(listAlunosCurso, status)
    let alunosStatusJSON = {}
    alunosStatusJSON.alunosStatus = listAlunosStatus

    if (listAlunosStatus) {
        response.status(200)
        response.json(alunosStatusJSON)
    } else {
        response.status(404)
    }
})
//EndPoint: Lista os alunos do mesmo Curso filtrando pelo ano de conclusao // Status: Funcionando
app.use('/alunos/anoConclusao/:ano/curso/:nomeCurso', cors(), async function (request, response, next) {
    let id = request.params.ano
    let curso = request.params.nomeCurso

    let listAnoCurso = getAlunosCursos(curso)
    let listAlunosAno = anoConclusao(listAnoCurso, id)

    let alunosAnoJSON = {}
    alunosAnoJSON.alunosAno = listAlunosAno

    if (listAlunosAno) {
        response.status(200)
        response.json(alunosAnoJSON)
    } else {
        response.status(404)
    }
})              
//EndPoint: Lista os alunos do mesmo Curso filtrado pelo ano de conclusao mas que retorna de acordo com Status(finalizado ou cursando)) // Status: Fazer


//EndPoints page3 //

//EndPoint: Filtrar aluno pela matricula // Status: Funcionando
app.use('/aluno/matricula/:matriculaAluno', cors(), async function (request, response, next) {
    let id = request.params.matriculaAluno
    let aluno = filterAlunos(id)
    let infosAluno = {}

    if (aluno) {
        infosAluno.aluno = aluno
        response.status(200)
        response.json(infosAluno)
    } else {
        response.status(404)
    }
})

//Functiion do start da API
app.listen(3030, function () {
    console.log('Servidor aguardando requisicoes.');
})