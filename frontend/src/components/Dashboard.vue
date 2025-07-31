<template>
  <v-container>
    <!-- Aqui você colocaria o form de adicionar participantes -->
    <v-form @submit.prevent="handleSubmit">...</v-form>

    <!-- Aqui você renderiza a tabela -->
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
  components: { ParticipantsTable },
  data() {
    return {
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
      if (!this.firstName || !this.lastName || this.participation <= 0) return;
      const newParticipant = {
        _id: Date.now(), // ou UUID se preferir
        firstName: this.firstName,
        lastName: this.lastName,
        participation: this.participation,
      };
      this.participants.push(newParticipant);
      this.firstName = '';
      this.lastName = '';
      this.participation = 0;
    },
    handleDelete(id) {
      this.participants = this.participants.filter(p => p._id !== id);
    },
  },
};
</script>
