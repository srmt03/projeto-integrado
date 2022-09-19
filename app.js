//Import da biblioteca do express para criar a API
const express = require('express');
//Import da biblioteca do cors para manipullar as permissoes do http
const cors = require('cors')
//Importbda biblioteca do body-parser que ira manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');
//Cria um objeto chamado app que sera especialista nas funcoes do express
const app = express();
//Import do arquivo de functions do sistema
const { getCursos, getCursoByNome } = require("./module/cursos.js")
const { getListAlunos, filterAlunos, getAlunosCursos, anoConclusao } = require("./module/alunos.js")

app.use((request, response, next) => {
    //Permite especificar quem serao os IPs que podem acessar a API ('*' - significa todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Permite especificar quais serao os verbos ou metodos qur a API ira reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors());
    
    next();
});
//EndPoint: Listar todos os cursos //Status: Funcionando
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
//EndPoint: Listar cursos pelo nome //Status: Funcionando
app.get('/cursos/:nome', cors(), async function (resquest, response, next) {
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

//EndPoint: Listar todos os alunos // Status: Funcionando
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
//EndPoint: Filtrar aluno pela matricula //Status: Funcionando
app.use('/aluno/:matriculaAluno', cors(), async function (request, response, next) {
    let id = request.params.matriculaAluno
    let aluno = filterAlunos(id)
    let infosAluno = {}

    if (aluno) {
        infosAlunos.aluno = aluno
        response.status(200)
        response.json(infosAluno)
    } else {
        response.status(404)
    }
})
//EndPoint: Listar alunos do mesmo curso// 
app.use('/alunos/:curso', cors(), async function (request, response, next) {
    let id = request.params.cursoAluno
    let  alunos = getAlunosCursos(id)
    let alunosJSON = {}

    if (alunos) {
        alunosJSON.alunos = alunos
        response.status(200)
        response.json(alunosJSON)
    } else {
        response.status(404)
    }
})
//EndPoint: Lista os alunos filtrando pelo ano de conclusao


//Functiion do start da API
app.listen(3030, function () {
    console.log('Servidor aguardando requisicoes.');
})
