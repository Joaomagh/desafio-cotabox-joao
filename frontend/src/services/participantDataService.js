import { getParticipants, createParticipant, deleteParticipant } from './api';
export const participantDataService = {
  /**
   * Busca todos os participantes e a soma total de participação do backend.
   * Espera um objeto com 'participants' (array) e 'totalParticipation' (número).
   * @returns {Object} Um objeto contendo o array de participantes e a participação total.
   */
  async fetchAllParticipants() {
    try {
      const responseData = await getParticipants(); 
      
      return { 
        participants: responseData.participants || [], // Garante que seja um array, mesmo que vazio
        totalParticipation: Number(responseData.totalParticipation) || 0 // Garante que seja um número
      };
    } catch (error) {
      console.error('Erro no serviço ao buscar participantes:', error);
      throw error; // Propaga o erro para o componente tratar
    }
  },

  /**
   * Adiciona um novo participante através da API.
   * @param {Object} participantData - Dados do participante a ser adicionado.
   * @returns {Object} A resposta do backend.
   */
  async addNewParticipant(participantData) {
    try {
      const response = await createParticipant(participantData);
      return response; 
    } catch (error) {
      console.error('Erro no serviço ao adicionar participante:', error);
      throw error; 
    }
  },

  /**
   * Exclui um participante através da API.
   * @param {string} id - O ID do participante a ser excluído.
   * @returns {Object} A resposta do backend.
   */
  async removeParticipant(id) {
    try {
      const response = await deleteParticipant(id);
      return response; 
    } catch (error) {
      console.error('Erro no serviço ao excluir participante:', error);
      throw error; 
    }
  },

  /**
   * Valida se a adição de uma nova participação não excede 100%.
   * @param {Array} currentParticipants - Array de participantes atuais.
   * @param {number} newParticipation - Nova participação a ser adicionada.
   * @returns {Object} Objeto com 'isValid' (boolean) e 'errorMessage' (string, se inválido).
   */
  validateParticipation(currentParticipants, newParticipation) {
    const total = Array.isArray(currentParticipants) 
                  ? currentParticipants.reduce((sum, p) => sum + Number(p.participation), 0)
                  : 0; 

    const newTotal = total + newParticipation;

    if (newTotal > 100) {
      return { isValid: false, errorMessage: `A soma das participações ultrapassa 100%. Total atual: ${total}%.` };
    }
    return { isValid: true };
  }
};
