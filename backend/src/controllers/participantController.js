const Participant = require('../models/Participant'); // Importa o modelo Participant

const getAllParticipants = async (req, res) => {
    try {
        const participants = await Participant.find();

        const totalParticipation = participants.reduce((sum, p) => sum + p.participation, 0);

        return res.status(200).json({ participants, totalParticipation });
    } catch (error) {
        console.error('Erro ao buscar participantes:', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar participantes.' });
    }
};
const createParticipant = async (req, res) => {
    const { firstName, lastName, participation } = req.body;

    try {
        const currentParticipants = await Participant.find();
        const currentTotal = currentParticipants.reduce((sum, p) => sum + p.participation, 0);
        const newTotalAfterAddition = currentTotal + Number(participation);

        if (newTotalAfterAddition > 100) {
            return res.status(400).json({ 
                message: `A soma total das participações excederia 100%. Total atual: ${currentTotal}%.`,
                currentTotal: currentTotal
            });
        }
        const newParticipant = new Participant({ firstName, lastName, participation });
        await newParticipant.save();
        
        return res.status(201).json({ message: 'Participante criado com sucesso!', participant: newParticipant });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: 'Dados inválidos:', errors: messages });
        }
        console.error('Erro ao criar participante:', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor ao criar participante.' });
    }
};
const deleteParticipant = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID do participante da URL (ex: /participants/123)
        const deletedParticipant = await Participant.findByIdAndDelete(id);
        if (!deletedParticipant) {
            return res.status(404).json({ message: 'Participante não encontrado.' });
        }

        return res.status(200).json({ message: 'Participante excluído com sucesso!', participant: deletedParticipant });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID de participante inválido.' });
        }
        console.error('Erro ao excluir participante:', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor ao excluir participante.' });
    }
};

module.exports = {
    getAllParticipants,
    createParticipant,
    deleteParticipant 
};