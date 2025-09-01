var conexao = require ("./conexaoBanco");
var express = require('express');
var app = express();
 
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({ extended: true} ));
 
app.set('view engine', 'ejs');
 
 
//conexão ao banco de dados uma vez no inicio
conexao.connect(function(error){
    if(error){
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit();
    //encerrar o servidor caso a conexão falhe
}
});
 
// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/views/index.html');
// });
// app.get('/cadastro', function(req, res){
//     res.sendFile(__dirname +'/cadastro.html');
// });
 
// app.post('/criar', function(req, res){
//     var tituloblog = req.body.tituloblog;
//     var textocurtodoblog = req.body.textocurtodoblog;
//     var conteudodoblog = req.body.conteudodoblog;
 
 
//     //prevenindo SQL Injection
//     var sql = "INSERT INTO novoblog(tituloblog, textocurtodoblog, conteudodoblog) VALUES (?, ?, ?)";
//     conexao.query(sql, [tituloblog, textocurtodoblog, conteudodoblog], function(error, result){
//         if(error) throw error;
 
//         // res.send("Estudante cadastrado com sucesso! " + result.insertId);
 
//         res.redirect('/novoblog');
//      });
 
 
//     });
 
 
// //Leitura do banco de dados
// app.get('/novoblog', function(req, res){
 
 
 
//     var sql = "select * from novoblog";
//     conexao.query(sql, function(error, result){
//         if(error) console.log(error);
//         // console.log(result);
//         res.render(__dirname + "/novoblog", {novoblog:result});
//         });
//     });
 
// app.listen(4001);



// Rota principal
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Home', blogs });
});

// Página "Sobre"
app.get('/sobre', (req, res) => {
    res.render('sobre', { titulo: 'Sobre Nós' });
});

// Redirecionamento de rota antiga
app.get('/sobrenos', (req, res) => {
    res.redirect('/sobre');
});

// Página de criação de blog
app.get('/blog/criar', (req, res) => {
    res.render('criar', { titulo: 'Novo Blog' });
});

// Rota POST para criação de blog
app.post('/blog/criar', (req, res) => {
    const { tituloblog , textocurtodoblog, conteudodoblog } = req.body;

    var sql = "INSERT INTO novoblog(tituloblog, textocurtodoblog, conteudodoblog) VALUES (?, ?, ?)";
    conexao.query(sql, [tituloblog, textocurtodoblog, conteudodoblog], (error, result) => {
        if (error) {
            console.error("Erro ao inserir no banco:", error);
            return res.status(500).send("Erro ao inserir dados");
        }
        res.redirect('/');
    });
});

// Página 404
app.use((req, res) => {
    res.status(404).render('404', { titulo: 'Página não encontrada' });
});

// Iniciar servidor
app.listen(4001, () => {
    console.log("Servidor rodando!");
});