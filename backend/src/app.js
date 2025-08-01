const express = require('express');
const cors = require('cors');
const participantRoutes = require('./routes/participantRoutes'); 

const app = express();

// Middlewares
// Habilita o parsing de requisições JSON no corpo da requisição.
app.use(express.json()); 

// Configuração do CORS (Cross-Origin Resource Sharing).
// Permite requisições do seu front-end rodando localmente na porta 8080.
app.use(cors({
  origin: 'http://localhost:8080' // Ajuste esta porta se o front-end rodar em outra.
}));

// Rotas da API para participantes.
app.use('/api/participants', participantRoutes);

// Rota de boas-vindas para o endpoint /api.
app.get('/api', (req, res) => {
  res.send('Bem-vindo à API de Participantes!');
});

// Rota de status para a raiz do servidor.
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

module.exports = app;
