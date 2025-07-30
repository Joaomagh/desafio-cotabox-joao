// backend/src/routes/participantRoutes.js
const express = require('express'); // Importa o Express
// Importa as funções do controlador de participantes
const { getAllParticipants, createParticipant } = require('../controllers/participantController');

const router = express.Router(); // Cria um novo roteador do Express

// Define a rota GET para '/' (que será '/api/participants' no app.js)
router.get('/', getAllParticipants);

// Define a rota POST para '/'
router.post('/', createParticipant);

module.exports = router; // Exporta o roteador
