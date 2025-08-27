var conexao = require ("./conexaoBanco");
var express = require('express');
var app = express();
 
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({ extended: true} ));
 
app.set('view engine', 'ejs');
 
 
//conexão ao banco de dados uma vez no inicio
conexao.connect(function(error){
    if(error){ throw error;
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit();
    //encerrar o servidor caso a conexão falhe
}
});
 
app.get('/', function(req, res){
    res.sendFile(__dirname+'/cadastro.html');
});
 
app.post('/', function(req, res){
    var tituloblog = req.body.tituloblog;
    var textocurtodoblog = req.body.textocurtodoblog;
    var conteudodoblog = req.body.conteudodoblog;
 
 
    //prevenindo SQL Injection
    var sql = "INSERT INTO novoblog(tituloblog, textocurtodoblog, conteudodoblog) VALUES (?, ?, ?)";
    conexao.query(sql, [tituloblog, textocurtodoblog, conteudodoblog], function(error, result){
        if(error) throw error;
 
        // res.send("Estudante cadastrado com sucesso! " + result.insertId);
 
        res.redirect('/novoblog');
     });
 
 
    });
 
 
//Leitura do banco de dados
app.get('/novoblog', function(req, res){
 
 
 
    var sql = "select * from novoblog";
    conexao.query(sql, function(error, result){
        if(error) console.log(error);
        // console.log(result);
        res.render(__dirname+"/novoblog", {novoblog:result});
        });
    });
 
app.listen(7000);