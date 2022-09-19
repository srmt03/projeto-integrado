var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga" :   "1200"
    }
];

//Listar Cursos 
const getCursos = () => {
    let listCursos = []
    let erro = true
    cursos.forEach(item => {
        listCursos.push(
            {
                nome: item.nome,
                sigla: item.sigla,
                icone: item.icone,
                carga: item.carga
            }
        )
        erro = false
    })
    if (erro)
        return false
    else
        return listCursos
}

//Localizar curso pelo nome
const getCursoByNome = (id) => {
    let nome = id
    let curso = []
    let erro = true 

    cursos.forEach(key => {
        if (key.nome.toLowerCase().includes(nome.toLowerCase())) 
        {
            let info = {}

            info.nome = key.nome,
            info.sigla = key.sigla,
            info.icone = key.icone,
            info.carga = key.carga

            curso.push(info)
            erro = false
        }
    })
    if (erro) 
        return false
    else 
        return curso   
}
//console.log(getCursoByNome('Desenvolvimento'));
//console.log(getCursos());

module.exports = {
    getCursos,
    getCursoByNome
}