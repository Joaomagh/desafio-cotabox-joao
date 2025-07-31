<template>
  <v-app>
    <v-main class="bg-background">
      <v-container fluid class="pa-0">
        <!-- Header Section (Topo Azul) -->
        <v-app-bar app color="primary" flat>
          <v-container class="d-flex align-center justify-center py-4">
            <!-- Formulário de Entrada no Header -->
            <v-form @submit.prevent="handleSubmit" class="d-flex flex-column flex-sm-row align-center justify-center flex-grow-1">
              <v-text-field
                v-model="firstName"
                label="Primeiro Nome"
                outlined
                dense
                hide-details
                class="mr-sm-4 mb-4 mb-sm-0 flex-grow-1"
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                label="Sobrenome"
                outlined
                dense
                hide-details
                class="mr-sm-4 mb-4 mb-sm-0 flex-grow-1"
              ></v-text-field>
              <v-text-field
                v-model.number="participation"
                label="Participação"
                outlined
                dense
                hide-details
                type="number"
                min="0"
                max="100"
                class="mr-sm-4 mb-4 mb-sm-0 flex-grow-1"
              ></v-text-field>
              <v-btn
                type="submit"
                color="white"
                class="primary--text font-weight-bold px-8 py-2"
                elevation="2"
              >
                ENVIAR
              </v-btn>
            </v-form>
          </v-container>
        </v-app-bar>

        <!-- Error Message (Global) -->
        <v-snackbar
          v-model="showErrorSnackbar"
          :timeout="5000"
          color="error"
          bottom
          right
        >
          {{ errorMessage }}
          <template v-slot:actions>
            <v-btn color="white" variant="text" @click="showErrorSnackbar = false">
              Fechar
            </v-btn>
          </template>
        </v-snackbar>

        <v-container class="mt-12 text-center">
          <h2 class="text-h4 font-weight-bold mb-2 text-text">DATA</h2>
          <p class="text-subtitle-1 mb-10 text-grey-darken-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

          <v-row>
            <v-col cols="12" lg="6">
              <v-card class="pa-4" elevation="2">
                <ParticipantsTable :participants="participants" :headers="tableHeaders" @delete-participant="handleDeleteParticipant" />
              </v-card>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card class="pa-4" elevation="2">
                <ParticipantsChart :participants="participants" :totalParticipation="totalParticipation" />
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Diálogo de Confirmação Personalizado -->
        <ConfirmDialog
          :modelValue="showConfirmDialog"
          @update:modelValue="showConfirmDialog = $event"
          :message="confirmMessage"
          @confirmed="onConfirmDelete"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ParticipantsTable from '@/components/ParticipantsTable.vue';
import ParticipantsChart from '@/components/ParticipantsChart.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { getParticipants, createParticipant, deleteParticipant } from '@/services/api';

export default {
  name: 'HomeView',
  components: { ParticipantsTable, ParticipantsChart, ConfirmDialog },
  data() {
    return {
      firstName: '',
      lastName: '',
      participation: '',
      errorMessage: '',
      participants: [],
      totalParticipation: 0,
      showErrorSnackbar: false,
      
      showConfirmDialog: false,
      confirmMessage: '',
      participantToDeleteId: null,

      // Definição dos cabeçalhos da tabela com alinhamento e largura ajustados
      tableHeaders: [
        { title: 'ID', key: 'id', align: 'center', sortable: false, width: '50px' },
        { title: 'Primeiro Nome', key: 'firstName', align: 'start', sortable: false, width: '150px' },
        { title: 'Sobrenome', key: 'lastName', align: 'start', sortable: false, width: '150px' },
        { title: 'Participação (%)', key: 'participation', align: 'center', sortable: false, width: '120px' },
        { title: 'Ações', key: 'actions', align: 'center', sortable: false, width: '100px' },
      ],
    };
  },
  watch: {
    errorMessage(newVal) {
      if (newVal) {
        this.showErrorSnackbar = true;
      }
    }
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

    handleDeleteParticipant(id) {
      this.participantToDeleteId = id;
      this.confirmMessage = 'Deseja realmente excluir este participante?';
      this.showConfirmDialog = true;
    },

    async onConfirmDelete(confirmed) {
      if (confirmed && this.participantToDeleteId) {
        try {
          await deleteParticipant(this.participantToDeleteId);
          await this.fetchParticipants();
          this.errorMessage = 'Participante excluído com sucesso!';
        } catch (error) {
          console.error('Erro ao excluir participante:', error.response?.data || error.message);
          if (error.response && error.response.data) {
            this.errorMessage = 'Erro ao excluir: ' + error.response.data.message;
          } else {
            this.errorMessage = 'Erro ao excluir participante. Tente novamente.';
          }
        } finally {
          this.participantToDeleteId = null;
        }
      } else {
        this.errorMessage = 'Exclusão cancelada.';
      }
    },
  },
};
</script>

<style scoped>

</style>
