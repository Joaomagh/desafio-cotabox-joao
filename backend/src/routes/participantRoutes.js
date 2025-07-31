const express = require('express');

const { getAllParticipants, createParticipant, deleteParticipant } = require('../controllers/participantController');

const router = express.Router();

router.get('/', getAllParticipants);


router.post('/', createParticipant);


router.delete('/:id', deleteParticipant);

module.exports = router;
