CREATE DATABASE blog;
 
-- criar uma tabela com colunas
 
CREATE TABLE novoblog  ({
id INT(10) AUTO_INCREMENT PRIMARY KEY,
tituloblog VARCHAR(60) NOT NULL,
textocurtodoblog VARCHAR(50) NOT NULL,
conteudodoblog VARCHAR (50) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
});
 
-- conecteBanco.connect((error)=>{
-- if(error) throw error;
-- console.log("O banco de dados foi conectado!");
-- });
 
 
--Inserir dados no banco de dados via código SQL (CREATE)
INSERT INTO novoblog(tituloblog, textocurtodoblog, conteudodoblog)
VALUES ("receitas blog", "receitas faceis e práticas", "receitas de bolos, tortas, doces e salgados");

 
-- selecionando todos os dados da tabela estudante (READ)
SELECT * FROM novoblog  ;
 
--selecionando uma coluna na tabela estudante
SELECT  textocurtodoblog FROM novoblog ;
 
--selecionando mais de uma coluna na tabela estudante
SELECT tituloblog, textocurtodoblog FROM novoblog ;