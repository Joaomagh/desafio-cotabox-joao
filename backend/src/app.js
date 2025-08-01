const express = require('express');
const cors = require('cors');
const participantRoutes = require('./routes/participantRoutes'); 

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://cotabox-challenge-frontend.vercel.app/' 
}));
app.use(express.json());

// Rotas
app.use('/api/participants', participantRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

module.exports = app;
