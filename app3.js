const express = require('express');
const bodyParser = require('body-parser');
const conexao = require('./conexaoBanco'); // certifique-se de que este arquivo está correto
const app = express();

// Configurações
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // renderização com EJS
app.set('views', __dirname + '/views'); // define a pasta 'views' onde ficam os arquivos .ejs

// Conexão ao banco de dados
conexao.connect(function(error) {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(); // encerra o servidor se não conseguir conectar
    } else {
        console.log("Conexão com banco de dados estabelecida.");
    }
});

// Rota para exibir o formulário de cadastro
app.get('/cadastro', function(req, res) {
    res.sendFile(__dirname + '/cadastro.html'); // mostra o formulário HTML
});

// Rota para processar envio do formulário
app.post('/criar', function(req, res) {
    const { tituloblog, textocurtodoblog, conteudodoblog } = req.body;

    const sql = "INSERT INTO novoblog(tituloblog, textocurtodoblog, conteudodoblog) VALUES (?, ?, ?)";
    conexao.query(sql, [tituloblog, textocurtodoblog, conteudodoblog], function(error, result) {
        if (error) {
            console.error("Erro ao inserir dados:", error);
            return res.status(500).send("Erro ao salvar no banco de dados.");
        }

        res.redirect('/novoblog'); // redireciona para lista de blogs após criar
    });
});

// Rota para listar os blogs
app.get('/novoblog', function(req, res) {
    const sql = "SELECT * FROM novoblog";
    conexao.query(sql, function(error, result) {
        if (error) {
            console.error("Erro ao buscar dados:", error);
            return res.status(500).send("Erro ao buscar dados no banco.");
        }

        res.render('novoblog', { novoblog: result }); // renderiza com EJS
    });
});

// Inicializa o servidor
app.listen(4001, function() {
    console.log("Servidor rodando na porta 4001");
});
