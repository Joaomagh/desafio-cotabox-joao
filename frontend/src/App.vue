<template>
  <div id="app">
    <main>
      <h1>Formulário de Participação</h1>

      <form @submit.prevent="handleSubmit">
        <input v-model="firstName" placeholder="Nome" />
        <input v-model="lastName" placeholder="Sobrenome" />
        <input v-model.number="participation" type="number" placeholder="Participação (%)" />
        <button type="submit">Enviar</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

      <ParticipantsTable :participants="participants" />
      <!-- ATUALIZADO: Passando a prop totalParticipation para o ParticipantsChart -->
      <ParticipantsChart :participants="participants" :totalParticipation="totalParticipation" />
    </main>
  </div>
</template>

<script>
import ParticipantsTable from './components/ParticipantsTable.vue';
import ParticipantsChart from './components/ParticipantsChart.vue';
import axios from 'axios';

export default {
  components: { ParticipantsTable, ParticipantsChart },
  data() {
    return {
      firstName: '',
      lastName: '',
      participation: '',
      errorMessage: '',
      participants: [],
      totalParticipation: 0, // Inicializa com 0
    };
  },
  mounted() {
    this.fetchParticipants();
  },
  methods: {
    async fetchParticipants() {
      try {
        const response = await axios.get('http://localhost:3000/api/participants');
        // ATUALIZADO: O backend agora retorna um objeto { participants: [], totalParticipation: 0 }
        this.participants = response.data.participants;
        this.totalParticipation = response.data.totalParticipation; // ATUALIZA A SOMA TOTAL
        this.errorMessage = '';
      } catch (error) {
        console.error('Erro ao buscar participantes:', error);
        this.errorMessage = 'Erro ao carregar participantes. Verifique se o backend está rodando.';
      }
    },

    async handleSubmit() {
      this.errorMessage = '';
      const newParticipation = Number(this.participation);

      if (!this.firstName || !this.lastName || isNaN(newParticipation) || newParticipation < 0 || newParticipation > 100) {
        this.errorMessage = 'Preencha todos os campos corretamente. A participação deve ser um número entre 0 e 100.';
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/participants', {
          firstName: this.firstName,
          lastName: this.lastName,
          participation: newParticipation
        });

        await this.fetchParticipants(); // Busca a lista e a soma total atualizadas
        this.firstName = '';
        this.lastName = '';
        this.participation = '';
        this.errorMessage = '';
      } catch (error) {
        console.error('Erro ao adicionar participante:', error.response?.data || error.message);
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message;
          if (error.response.data.errors && error.response.data.errors.length > 0) {
            this.errorMessage += ' ' + error.response.data.errors.join(', ');
          }
        } else {
          this.errorMessage = 'Erro ao adicionar participante. Tente novamente.';
        }
      }
    },
  },
};
</script>

<style scoped>
main {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}
input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
