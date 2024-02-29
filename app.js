// Desenvolvedor @_d.lino //

// Importar módulos
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

// App
const app = express();

// Configuração de PORTA
const PORT = 3000;

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Adicionar arquivos estáticos (HTML, CSS, JS)
app.use('/assets', express.static('./assets'));

// Referenciar a pasta de imagens
app.use('/image', express.static('./image'));

// Configuração de conexão
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'convite'
});

// Teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conectado ao banco de dados com sucesso!');
});

// Verificar se a tabela existe
conexao.query("SHOW TABLES LIKE 'Pessoas'", (erro, resultado) => {
    if (erro) throw erro;
    if (resultado.length === 0) {
        // Se a tabela não existe, crie-a
        const tablePessoas = `CREATE TABLE Pessoas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            parentesco VARCHAR(100),
            cor VARCHAR(50),
            comidas TEXT,
            bebidas TEXT
        )`;
        conexao.query(tablePessoas, (erro, retorno) => {
            if (erro) throw erro;
            console.log('Tabela Pessoas criada com sucesso!');
        });
    }
});

// Rota para lidar com o envio do formulário
app.post('/submit-form', (req, res) => {
    const { nome, parentesco, cor, comidas, bebidas } = req.body;

    // Insira os dados no banco de dados
    const sql = 'INSERT INTO Pessoas (nome, parentesco, cor, comidas, bebidas) VALUES (?, ?, ?, ?, ?)';
    conexao.query(sql, [nome, parentesco, cor, comidas, bebidas], (erro, retorno) => {
        if (erro) throw erro;
        console.log('Dados inseridos com sucesso!');
        res.redirect('/');
    });
});

// Rota para obter dados da tabela de pessoas
app.get('/dados-pessoas', (req, res) => {
    const sql = 'SELECT * FROM Pessoas';
    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).send('Erro ao obter dados da tabela de pessoas');
            return;
        }
        res.json(resultados);
    });
});

// Rota para renderizar a página index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// Servidor
const servidor = app.listen(PORT, (erro)=>{
    if(erro){
        console.log(erro);
    } else {
        console.log(`Conectado ao servidor com sucesso!
        http://localhost:${PORT}/`);
    };
});