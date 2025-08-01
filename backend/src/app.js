const express = require('express');
const cors = require('cors');
const participantRoutes = require('./routes/participantRoutes'); 

const app = express();
app.use(express.json()); // Middleware para parsear JSON


app.use(cors()); 

app.use('/api/participants', participantRoutes);

app.get('/api', (req, res) => {
    res.send('Bem-vindo à API de Participantes!');
});

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

module.exports = app;
    