    // backend/src/app.js
    const express = require('express');
    const cors = require('cors');
    const participantRoutes = require('./routes/participantRoutes'); 

    const app = express();

    // Middlewares
    app.use(express.json()); // Middleware para parsear JSON

    app.use(cors({
      origin: function (origin, callback) {
        // Lista de origens permitidas (inclua todas as URLs possíveis do seu front-end)
        const allowedOrigins = [
          'https://desafio-cotabox-joao.vercel.app', // URL principal do seu projeto Vercel
        ];

        // Loga a origem da requisição para depuração
        console.log('Requisição de origem:', origin);

        // Verifica se a origem da requisição está na lista de origens permitidas
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.error('CORS: Origem não permitida:', origin);
          callback(new Error('Not allowed by CORS')); // Bloqueia a requisição
        }
      }
    }));

    // Rotas
    app.use('/api/participants', participantRoutes);

    app.get('/api', (req, res) => {
        res.send('Bem-vindo à API de Participantes!');
    });

    app.get('/', (req, res) => {
        res.send('API funcionando!');
    });

    module.exports = app;
    