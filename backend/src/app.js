const express = require('express');
const cors = require('cors');
const participantRoutes = require('./routes/participantRoutes'); 

const app = express();

// Middlewares
// Configuração do CORS - Permite requisições APENAS do seu front-end na Vercel
app.use(cors({
  origin: 'https://cotabox-challenge-frontend-md3m81hr2.vercel.app' 
}));
app.use(express.json());

// Rotas
app.use('/api/participants', participantRoutes);

// Nova rota para o caminho /api
app.get('/api', (req, res) => {
    res.send('Bem-vindo à API de Participantes!');
});

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

module.exports = app;
