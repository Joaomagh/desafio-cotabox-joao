<template>
  <v-container>
    <ParticipantsTable
      :participants="participants"
      :headers="headers"
      @delete-participant="handleDelete"
    />
  </v-container>
</template>

<script>
import ParticipantsTable from './ParticipantsTable.vue';

export default {
  name: 'ParticipantManager', // Nome do componente para melhor clareza
  components: { ParticipantsTable },
  data() {
    return {
      // Dados do formulário para adicionar um novo participante
      firstName: '',
      lastName: '',
      participation: 0,
      
      participants: [],
      
      headers: [
        { text: 'ID', value: 'id', align: 'center' },
        { text: 'Primeiro Nome', value: 'firstName' },
        { text: 'Sobrenome', value: 'lastName' },
        { text: 'Participação (%)', value: 'participation', align: 'center' },
        { text: 'Ações', value: 'actions', align: 'center', sortable: false },
      ],
    };
  },
  methods: {
    handleSubmit() {
      if (!this.firstName || !this.lastName || this.participation <= 0) {
        return; 
      }

      // Cria um novo objeto participante com um ID único.
      const newParticipant = {
        _id: Date.now(), // Usando Date.now() como ID temporário para demonstração local
        firstName: this.firstName,
        lastName: this.lastName,
        participation: this.participation,
      };

      this.participants.push(newParticipant);

      this.firstName = '';
      this.lastName = '';
      this.participation = 0;
    },
    
    /**
     * Deleta um participante da lista local pelo seu ID.
     * Em uma aplicação real, esta função faria uma chamada à API para remover o dado do banco.
     * @param {number} id - O ID do participante a ser deletado.
     */
    handleDelete(id) {
      this.participants = this.participants.filter(p => p._id !== id);
    },
  },
};
</script>

<style scoped>
</style>
