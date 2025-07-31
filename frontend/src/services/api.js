import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
});

export const getParticipants = async () => {
  try {
    const response = await api.get('/participants');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    throw error;
  }
};

export const createParticipant = async (participantData) => {
  try {
    const response = await api.post('/participants', participantData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar participante:', error);
    throw error;
  }
};

export const deleteParticipant = async (id) => {
  try {
    const response = await api.delete(`/participants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar participante:', error);
    throw error;
  }
};
