    <template>
      <div class="home">
        <main>
          <h1>Formulário de Participação</h1>

          <form @submit.prevent="handleSubmit">
            <input v-model="firstName" placeholder="Nome" />
            <input v-model="lastName" placeholder="Sobrenome" />
            <input v-model.number="participation" type="number" placeholder="Participação (%)" />
            <button type="submit">Enviar</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          </form>

          <ParticipantsTable :participants="participants" @delete-participant="handleDeleteParticipant" />
          <ParticipantsChart :participants="participants" :totalParticipation="totalParticipation" />
        </main>
      </div>
    </template>

    <script>
    import ParticipantsTable from '@/components/ParticipantsTable.vue';
    import ParticipantsChart from '@/components/ParticipantsChart.vue';
    import { getParticipants, createParticipant, deleteParticipant } from '@/services/api';

    export default {
      name: 'HomeView', // <-- ATUALIZADO AQUI
      components: { ParticipantsTable, ParticipantsChart },
      data() {
        return {
          firstName: '',
          lastName: '',
          participation: '',
          errorMessage: '',
          participants: [],
          totalParticipation: 0,
        };
      },
      mounted() {
        this.fetchParticipants();
      },
      methods: {
        async fetchParticipants() {
          try {
            const data = await getParticipants();
            this.participants = data.participants;
            this.totalParticipation = data.totalParticipation;
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
            await createParticipant({
              firstName: this.firstName,
              lastName: this.lastName,
              participation: newParticipation
            });

            await this.fetchParticipants();
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

        async handleDeleteParticipant(id) {
          if (window.confirm('Tem certeza que deseja excluir este participante?')) {
            try {
              await deleteParticipant(id);
              await this.fetchParticipants();
              this.errorMessage = '';
              alert('Participante excluído com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir participante:', error.response?.data || error.message);
              if (error.response && error.response.data) {
                this.errorMessage = 'Erro ao excluir: ' + error.response.data.message;
              } else {
                this.errorMessage = 'Erro ao excluir participante. Tente novamente.';
              }
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
    