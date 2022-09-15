//Import da biblioteca do express para criar a API
const express = require('express');
//Import da biblioteca do cors para manipullar as permissoes do http
const cors = require('cors')
//Importbda biblioteca do body-parser que ira manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');
//Cria um objeto chamado app que sera especialista nas funcoes do express
const app = express();
//Import do arquivo de functions do sistema

app.use((request, response, next) => {
    //Permite especificar quem serao os IPs que podem acessar a API ('*' - significa todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Permite especificar quais serao os verbos ou metodos qur a API ira reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors());
    
    next();
});






//Functiion do start da API
app.listen(3030, function () {
    console.log('Servidor aguardando requisicoes.');
});