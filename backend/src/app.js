const express = require('express');
const cors = require('cors');
        const participantRoutes = require('./routes/participantRoutes'); 

    const app = express();

    // Middlewares
    app.use(express.json()); 

    app.use(cors({
      origin: '*' 
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
    