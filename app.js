const express = require('express');

//Express aplicativo - configurando o acesso as funções 
const app = express();

//Registrar a visualização da engenharia
app.set('view engine, ejs');

//Ouvindo as requisições na porta
app.listen(3001);

//Acessando uma rota 
app.get('/', (req, res)=>{
    res.render('index');
});

//Nova rota 
app.get('/sobre', (req, res)=>{
    res.render('sobre');
});

//Redirecionamento de página
app.get('/sobrenos', (req, res)=>{
    res.redirect('/sobre');
});

//Erro 404
app.use((req, res)=>{
    res.status(404).render();
});