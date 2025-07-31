// frontend/src/services/participantDataService.js
import { getParticipants, createParticipant, deleteParticipant } from './api';

// Este serviço encapsula a lógica de negócio e as chamadas à API para participantes.
export const participantDataService = {
  // Busca todos os participantes e a soma total
  async fetchAllParticipants() {
    try {
      const data = await getParticipants();
      return { participants: data.participants, totalParticipation: data.totalParticipation };
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

  // Validação de participação (lógica de negócio que pode ser centralizada)
  validateParticipation(currentParticipants, newParticipation) {
    const total = currentParticipants.reduce((sum, p) => sum + Number(p.participation), 0);
    const newTotal = total + newParticipation;

    if (newTotal > 100) {
      return { isValid: false, errorMessage: `A soma das participações ultrapassa 100%. Total atual: ${total}%.` };
    }
    return { isValid: true };
  }
};
