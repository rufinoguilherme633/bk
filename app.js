/*************************************************************
 * Objetivo:
 * estados e cidades
 * Data: 27/03/2023
 * Autor: paula
 * Versão 1.0
 *************************************************************/
const express = require('express')
    //Responsavel pelas permissoes das requisiçoes
const cors = require('cors')
    //responsavel pela manipulaçao do body da requisiçao
const bodyParser = require('body-parser')

//Impot do arquivo de fuçoes para listar estados e cidades
const alunos = require('./modulo/alunos.js')
const cursos = require('./modulo/cursos.js')
const funct = require('./function.js')


const { request } = require('express')
    //cria um objeto com as informaçoes da classe express
const app = express()

//Define  a permissoes no header da API
app.use((request, response, next) => {
    //permite gerenciar a origin das requisiçoes da API 
    // * - significa que a API sera publica
    // IP - se colocar o IP, a API somente respondera para aquela maquina
    response.header('Access-Control-Allow-Origin', '*')

    //PERMITE GERENCIAR QUAIS VERBOS (METODOS) PODERAO FAZER REQUISIÇOES
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //ATIVA NO CORS DAS REQUISIÇOES AS PERMISSOES ESTABELECIDAS
    app.use(cors())

    next();
})

//endPoints 

//cursos
app.get('/v1/lion-school/cursos', cors(), async function(request, response, next) {

    let listCurso = funct.getListaCursos()

    if (listCurso) {
        response.json(listCurso)
        response.status(200)
    } else {
        response.status(500)
    }
})




app.get('/v1/lion-school/alunos', cors(), async function(request, response, next) {

    let listAlunos = funct.getListarAluno()

    if (listAlunos) {
        response.json(listAlunos)
        response.status(200)
    } else {
        response.status(500)
    }

})

app.get('/v1/lion-school/alunos/matricula', cors(), async function(request, response, next) {

    let statusMatricula = request.query.numero
    let statusCode
    let dadosMatricula = {}

    //Tratamento para validar os valores encaminhados no parametro
    if (statusMatricula == '' || statusMatricula == undefined || isNaN(statusMatricula)) {

        statusCode = 400

    } else {
        let listMatricula = funct.getListarMatricula(statusMatricula)


        if (listMatricula) {
            statusCode = 200 //Estado encontrado
            dadosMatricula = listMatricula

        } else {
            statusCode = 404 // Estado nao encontrado
        }
    }
    response.status(statusCode)
    response.json(dadosMatricula)

})

app.get('/v1/lion-school/alunos/curso', cors(), async function(request, response, next) {

    let statusCurso = request.query.sigla
    let statusAno = request.query.ano
    let statusCode
    let dadosCurso = {}

    //Tratamento para validar os valores encaminhados no parametro
    if (statusCurso == '' || statusCurso == undefined || !isNaN(statusCurso)) {

        statusCode = 400

    } else {
        let listFiltroCurso = funct.getListarFiltrandoCurso(statusCurso, statusAno)


        if (listFiltroCurso) {
            statusCode = 200 //Estado encontrado
            dadosCurso = listFiltroCurso

        } else {
            statusCode = 404 // Estado nao encontrado
        }
    }
    response.status(statusCode)
    response.json(dadosCurso)

})

app.get('/v1/lion-school/alunos/classificacao', cors(), async function(request, response, next) {

    let statuStatus = request.query.status
    let statusCode
    let dadoStatus = {}

    //Tratamento para validar os valores encaminhados no parametro
    if (statuStatus == '' || statuStatus == undefined || !isNaN(statuStatus)) {

        statusCode = 400

    } else {
        let listFiltroStatus = funct.getListarFiltrandoStatus(statuStatus)


        if (listFiltroStatus) {
            statusCode = 200 //Estado encontrado
            dadoStatus = listFiltroStatus

        } else {
            statusCode = 404 // Estado nao encontrado
        }
    }
    response.status(statusCode)
    response.json(dadoStatus)


})
app.get("/v1/senai/alunos", cors(), async function(request, response, next) {

    let siglaCurso = request.query.curso;
    let statusAluno = request.query.status;
    let anoConclusao = request.query.ano;

    let dadosAluno = {};
    let statusCode;

    if (siglaCurso != undefined) {
        if (siglaCurso == undefined) {
            statusCode = 400;
            dadosAluno.message =
                "Sigla do curso inválida ou vazia. Preencha corretamente";
        } else {
            if (anoConclusao != undefined && statusAluno == undefined) {
                if (anoConclusao == undefined) {
                    statusCode = 400;
                    dadosAluno.message =
                        "Ano de conclusão inválido ou vazio. Preencha corretamente";
                } else {
                    let alunos = alunosAno.getListaAlunosAno(siglaCurso, anoConclusao);
                    if (alunos) {
                        statusCode = 200;
                        dadosAluno.alunos = alunos;
                    } else {
                        statusCode = 404;
                    }
                }

                response.status(statusCode);
                response.json(dadosAluno);
            }
            if (anoConclusao == undefined && statusAluno != undefined) {
                if (statusAluno == undefined) {
                    statusCode = 400;
                    dadosAluno.message =
                        "Status inválido ou vazio. Preencha corretamente";
                } else {
                    let alunos = alunosStatus.getListaAlunosStatus(
                        siglaCurso,
                        statusAluno
                    );
                    if (alunos) {
                        statusCode = 200;
                        dadosAluno.alunos = alunos;
                    } else {
                        statusCode = 404;
                    }
                }

                response.status(statusCode);
                response.json(dadosAluno);
            }
            if (anoConclusao != undefined && statusAluno != undefined) {
                if (statusAluno == undefined) {
                    statusCode = 400;
                    dadosAluno.message =
                        "Status e/ou ano de conclusão inválido ou vazio. Preencha corretamente";
                } else {
                    let alunos = alunosStatusAno.getListaAlunosStatusAno(
                        siglaCurso,
                        statusAluno,
                        anoConclusao
                    );
                    if (alunos) {
                        statusCode = 200;
                        dadosAluno.alunos = alunos;
                    } else {
                        statusCode = 404;
                    }
                }

                response.status(statusCode);
                response.json(dadosAluno);
            }
            if (anoConclusao == undefined && statusAluno == undefined) {
                let alunos = alunosMatriculados.getListarFiltrandoCurso(
                    siglaCurso
                );
                if (alunos) {
                    statusCode = 200;
                    dadosAluno.alunos = alunos;
                } else {
                    statusCode = 404;
                }

                response.status(statusCode);
                response.json(dadosAluno);
            }
        }
    }
})


//permite carregar os endPoints e aguardar as requisiçoes pelo protocolo HTTP na porta 8080
app.listen(8080, function() {
    console.log('servidor aguardando requisiçoes na porta 8080')
});