const Participant = require('../models/Participant'); // Importa o modelo Participant

// Função para listar todos os participantes
const getAllParticipants = async (req, res) => {
    try {
        // Busca todos os documentos na coleção 'participants'
        const participants = await Participant.find();

        // Calcula a soma total das participações de todos os participantes
        const totalParticipation = participants.reduce((sum, p) => sum + p.participation, 0);

        // Retorna a lista de participantes e a soma total com status 200 (OK)
        return res.status(200).json({ participants, totalParticipation });
    } catch (error) {
        // Em caso de erro, loga no console do servidor e retorna um erro 500 para o cliente
        console.error('Erro ao buscar participantes:', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar participantes.' });
    }
};

// Função para criar um novo participante
const createParticipant = async (req, res) => {
    // Desestrutura os dados do corpo da requisição
    const { firstName, lastName, participation } = req.body;

    try {
        // --- Validação de 100% da Soma das Participações ---
        // 1. Busca todos os participantes atuais para calcular a soma
        const currentParticipants = await Participant.find();
        const currentTotal = currentParticipants.reduce((sum, p) => sum + p.participation, 0);

        // 2. Calcula a nova soma com a participação que está sendo adicionada
        const newTotalAfterAddition = currentTotal + Number(participation);

        // 3. Verifica se a nova soma excede 100%
        if (newTotalAfterAddition > 100) {
            // Se exceder, retorna um erro 400 (Bad Request) com uma mensagem clara
            return res.status(400).json({ 
                message: `A soma total das participações excederia 100%. Total atual: ${currentTotal}%.`,
                currentTotal: currentTotal // Opcional: envia o total atual para o frontend
            });
        }

        // --- Criação do Participante ---
        // Cria uma nova instância do modelo Participant com os dados recebidos
        const newParticipant = new Participant({ firstName, lastName, participation });
        
        // Salva o novo participante no banco de dados
        await newParticipant.save();
        
        // Retorna uma mensagem de sucesso e o participante criado com status 201 (Created)
        return res.status(201).json({ message: 'Participante criado com sucesso!', participant: newParticipant });
    } catch (error) {
        // --- Tratamento de Erros ---
        // Se o erro for de validação do Mongoose (definido no Schema)
        if (error.name === 'ValidationError') {
            // Extrai as mensagens de erro de validação
            const messages = Object.values(error.errors).map(val => val.message);
            // Retorna um erro 400 com as mensagens de validação
            return res.status(400).json({ message: 'Dados inválidos:', errors: messages });
        }
        // Para qualquer outro tipo de erro (ex: erro de conexão com DB)
        console.error('Erro ao criar participante:', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor ao criar participante.' });
    }
};

module.exports = {
    getAllParticipants,
    createParticipant
};
