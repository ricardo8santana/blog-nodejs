const express = require('express');

//Express aplicativo - configurando o acesso as funções 
const app = express();

//Ouvindo as requisições na porta
app.listen(3001);

//Acessando uma rota 
app.get('/', (req, res)=>{
    res.send('<p>Págibna inicial</p>')
});