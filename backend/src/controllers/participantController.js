// backend/src/controllers/participantController.js
const Participant = require('../models/Participant');

/**
 * Busca todos os participantes e calcula a soma total de participação.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    
    // Calcula a soma total da participação para o gráfico.
    const totalParticipation = participants.reduce((sum, p) => sum + Number(p.participation), 0);

    res.status(200).json({ 
      participants, // Atalho para participants: participants
      totalParticipation 
    });
  } catch (error) {
    console.error('Erro ao buscar participantes no controlador:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar participantes' });
  }
};

/**
 * Cria um novo participante no banco de dados.
 * @param {Object} req - Objeto de requisição do Express (contém firstName, lastName, participation no body).
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.createParticipant = async (req, res) => {
  try {
    const { firstName, lastName, participation } = req.body;

    // Validação básica dos campos obrigatórios e tipo de participação.
    if (!firstName || !lastName || participation === undefined || isNaN(Number(participation))) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios e participação deve ser um número.' });
    }

    const newParticipant = new Participant({ 
      firstName, 
      lastName, 
      participation: Number(participation) // Garante que participation é um número
    });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error('Erro ao criar participante no controlador:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao criar participante' });
  }
};

/**
 * Deleta um participante pelo ID.
 * @param {Object} req - Objeto de requisição do Express (contém id nos parâmetros).
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByIdAndDelete(id);

    if (!participant) {
      return res.status(404).json({ message: 'Participante não encontrado.' });
    }
    res.status(200).json({ message: 'Participante excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar participante no controlador:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar participante' });
  }
};
