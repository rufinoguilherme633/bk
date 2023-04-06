const alunos = require('./modulo/alunos.js')
const cursos = require('./modulo/cursos.js')

function getListaCursos() {

    let listaJson = {}
    let listaArry = []

    cursos.cursos.forEach(function(date) {

        listaArry.push({
            Curso: date.nome,
            Sigla_Curso: date.sigla,
            Icone: date.icone,
            Carga_Horaria: date.carga
        })
        listaJson.cursos = listaArry
    })

    return listaJson
}
//console.log(getListaCursos())

function getListarAluno() {

    let listaJson = {}
    let listaArry = []

    alunos.alunos.forEach(function(date) {

        listaArry.push({

            Perfil: date.foto,
            Nome: date.nome,
            Matricula: date.matricula,
            Sexo: date.sexo,
            Curso: date.curso,
            Status: date.status

        })
        listaJson.alunos = listaArry

    })

    return listaJson
}
//console.log(getListarAluno())

function getListarMatricula(matricula) {

    let listaJson = {}
    let listaArry = []

    alunos.alunos.forEach(function(dados) {

        if (matricula == dados.matricula) {
            listaArry.push({
                Numero_Matricula: dados.matricula,
                Nome: dados.nome,
                Sexo: dados.sexo,
                curso: dados.curso,
                Status: dados.status
            })
            listaJson.matricula = listaArry

        }
    })

    return listaJson

}
console.log(getListarMatricula(20151001017))
function getListarFiltrandoCurso(curso, anoConclusao) {
    let listaJson = {}
    let listaArry = []

    alunos.alunos.forEach(function(dados) {
        dados.curso.forEach(function(sigla) {
            if (
                sigla.sigla == curso &&
                sigla.conclusao == anoConclusao

            ) {
                listaArry.push({
                    Perfil: dados.foto,
                    nome: dados.nome,
                    Matricula: dados.matricula,
                    sexo: dados.sexo,
                    curso: sigla.sigla,
                    Disciplinas: sigla.disciplinas,
                    conclusao: sigla.conclusao

                })
            }
        })

        listaJson.curso = listaArry

    })
    return listaJson
}

//console.log(getListarFiltrandoCurso("RDS", "2023"))


function getListarFiltrandoStatus(status) {
    let listaJson = {}
    let listaArry = []

    alunos.alunos.forEach(function(dados) {
        if (status == dados.status) {
            listaArry.push({

                Perfil: dados.foto,
                nome: dados.nome,
                Matricula: dados.matricula,
                sexo: dados.sexo,
                curso: dados.curso,
                Status: dados.status
            })
            listaJson.status = listaArry
        }

    })

    return listaJson
}

console.log(getListarFiltrandoStatus('Cursando'));

//console.log(getListarFiltrandoStatus('Cursando'))



module.exports = {
    getListaCursos,
    getListarAluno,
    getListarFiltrandoCurso,
    getListarFiltrandoStatus,
    getListarMatricula
}