// backend/src/controllers/participantController.js
const Participant = require('../models/Participant'); // Assumindo que você tem um modelo Participant

// Função para buscar todos os participantes
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    
    // Calcula a soma total da participação
    const totalParticipation = participants.reduce((sum, p) => sum + Number(p.participation), 0);

    // Retorna um objeto com os participantes e a soma total
    return res.status(200).json({ 
      participants: participants, 
      totalParticipation: totalParticipation 
    });
  } catch (error) {
    console.error('Erro ao buscar participantes no controlador:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao buscar participantes' });
  }
};

// Função para criar um novo participante
exports.createParticipant = async (req, res) => {
  try {
    const { firstName, lastName, participation } = req.body;

    // Validação básica (pode ser mais robusta)
    if (!firstName || !lastName || participation === undefined || isNaN(Number(participation))) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios e participação deve ser um número.' });
    }

    const newParticipant = new Participant({ firstName, lastName, participation: Number(participation) });
    await newParticipant.save();
    return res.status(201).json(newParticipant);
  } catch (error) {
    console.error('Erro ao criar participante no controlador:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao criar participante' });
  }
};

// Função para deletar um participante
exports.deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByIdAndDelete(id);

    if (!participant) {
      return res.status(404).json({ message: 'Participante não encontrado.' });
    }
    return res.status(200).json({ message: 'Participante excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar participante no controlador:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao deletar participante' });
  }
};
