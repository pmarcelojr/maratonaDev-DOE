// Configurando Server
const express = require('express');
const server = express()

// configurar server para apresentar arquivos estaticos
server.use(express.static('public'))

// habilitar body do formulario
server.use(express.urlencoded({ extended: true }))

// configurar a conexao com o BD
const Pool = require('pg').Pool
const db = new Pool({
    user: 'marcelo',
    password: 'M@sp1578',
    host: 'localhost',
    port: 5432,
    database: 'doesangue'
})

// configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server,
    noCache: true
})

// configurando a apresentacao da página
server.get('/', (request, response) => {
    
    // Apresentar usuarios cadastrados no BD
    db.query("SELECT * FROM donors", function(err, result) {
        // Fluxo de erro
        if (err)
            return response.send("Erro de Bancon de Dados.")
        // Fluxo ideal
        const donors = result.rows
        
        return response.render("index.html", { donors })        
    })

})

server.post('/', (request, response) => {
    // pegar dados do formulario
    const name = request.body.name
    const email = request.body.email
    const blood = request.body.blood

    // regra para não entrar vazia no BD (Se o name ou email ou blood for vazio faça)
    if (name == "" || email == "" || blood == "") {
        return response.send("Todos os campos são obrigatórios.")
    }

    // Coloco valores dentro do BD
    const query = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        // Fluxo de erro
        if (err) 
            return response.send("Erro no Banco de Dados")
        // Fluxo idel
        return response.redirect("/")
    })
    
})

// Ligar o servidor e permitir acesso a porta 3000
server.listen(3000, () => {
    console.log("Server Running")
})