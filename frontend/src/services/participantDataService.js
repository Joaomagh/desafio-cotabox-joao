import { getParticipants, createParticipant, deleteParticipant } from './api';

// Este serviço encapsula a lógica de negócio e as chamadas à API para participantes.
export const participantDataService = {
  // Busca todos os participantes
  async fetchAllParticipants() {
    try {
      const participants = await getParticipants(); // getParticipants() já retorna o array
      return participants; // Retorna o array diretamente
    } catch (error) {
      console.error('Erro no serviço ao buscar participantes:', error);
      throw error; // Propaga o erro para o componente tratar
    }
  },

  // Adiciona um novo participante
  async addNewParticipant(participantData) {
    try {
      const response = await createParticipant(participantData);
      return response; // Retorna a resposta do backend (sucesso ou erro de validação)
    } catch (error) {
      console.error('Erro no serviço ao adicionar participante:', error);
      throw error; // Propaga o erro para o componente tratar
    }
  },

  // Exclui um participante
  async removeParticipant(id) {
    try {
      const response = await deleteParticipant(id);
      return response; // Retorna a resposta do backend
    } catch (error) {
      console.error('Erro no serviço ao excluir participante:', error);
      throw error; // Propaga o erro para o componente tratar
    }
  },

  validateParticipation(currentParticipants, newParticipation) {
    // Garante que currentParticipants é um array antes de tentar reduzir
    const total = Array.isArray(currentParticipants) 
                  ? currentParticipants.reduce((sum, p) => sum + Number(p.participation), 0)
                  : 0; // Se não for array, assume 0

    const newTotal = total + newParticipation;

    if (newTotal > 100) {
      return { isValid: false, errorMessage: `A soma das participações ultrapassa 100%. Total atual: ${total}%.` };
    }
    return { isValid: true };
  }
};