const express = require('express');

//Express aplicativo - configurando o acesso as funções 
const app = express();

//Registrar a visualização da engenharia
app.set('view engine', 'ejs');

//Ouvindo as requisições na porta
app.listen(3001);

//Acessando uma rota 
app.get('/', (req, res)=>{


//Passando para o body
const blogs = [
     { titulo: 'Chamander', conteudo: 'A ponta de seu rabo está constatemente em chams e se for apagada pode resultar em sua morte'},
     { titulo : 'Squirtle', conteudo: 'Seu casco reduz a resistência contra a água fazendo com que ele nade mais rápido.'},
     { titulo: 'Buldasaur', conteudo: 'Ao evoluir o bulbo começa a desabrochar até se tornar uma grande flor na evolução final'},
       
];
res.render('index', { titulo: 'Home', blogs });
});

//Nova rota 
app.get('/sobre', (req, res)=>{
    res.render('sobre', { titulo:'Sobre' });
});

//Redirecionamento de página
app.get('/sobrenos', (req, res)=>{
    res.redirect('/sobre');
});

//Rota da criação conteudo
app.get('/blog/criar', (req, res)=>{
    res.render('criar', { titulo: 'Criar novo Blog'});
});

//Erro 404
app.use((req, res)=>{
    res.status(404).render('404',  { titulo: 'Erro'});
});