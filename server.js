// Configurando Server
const express = require('express');
const server = express()

// configurar server para apresentar arquivos estaticos
server.use(express.static('public'))

// habilitar body do formulario
server.use(express.urlencoded({ extended: true }))

// configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server,
    noCache: true
})

// Lista de Doadores: Vetor ou Array
const donors = [
    {
        name: "Marcelo Santos",
        blood: "AB+"
    },
    {
        name: "Robson Marques",
        blood: "B+"
    },
    {
        name: "Diego Fernandes",
        blood: "A+"
    },
    {
        name: "Joaquina Felix",
        blood: "O+"
    }
]

// configurando a apresentacao da página
server.get('/', (request, response) => {
    return response.render("index.html", { donors })
})

server.post('/', (request, response) => {
    // pegar dados do formulario
    const name = request.body.name
    const email = request.body.email
    const blood = request.body.blood

    // Coloco valores dentro do array
    donors.push({
        name: name,
        blood: blood,
    })

    return response.redirect("/")
})

// Ligar o servidor e permitir acesso a porta 3000
server.listen(3000, () => {
    console.log("Server Running")
})