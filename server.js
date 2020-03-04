// Configurando Server
const express = require('express');
const server = express()

// configurar server para apresentar arquivos estaticos
server.use(express.static('public'))

// configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server
})

// configurando a apresentacao da página
server.get('/', (request, response) => {
    return response.render("index.html")
})

// Ligar o servidor e permitir acesso a porta 3000
server.listen(3000, () => {
    console.log("Server Running")
})