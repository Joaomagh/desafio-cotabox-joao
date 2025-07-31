<template>
  <v-app>
    <v-main class="bg-background">
      <!-- Header Section -->
      <v-app-bar color="primary" flat>
        <!-- Revertido para v-toolbar-title para exibir o texto "Cotabox Challenge" -->
        <v-toolbar-title class="text-h6 font-weight-bold text-white">Cotabox Challenge</v-toolbar-title>
      </v-app-bar>

      <!-- Formulário de Entrada de Participantes -->
      <v-container class="py-6 px-4">
        <v-card class="pa-4" elevation="2">
          <v-form @submit.prevent="handleSubmit">
            <v-row dense align="center">
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  outlined
                  dense
                  hide-details="auto"
                  color="primary"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  outlined
                  dense
                  hide-details="auto"
                  color="primary"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model.number="participation"
                  label="Participation (%)"
                  type="number"
                  outlined
                  dense
                  hide-details="auto"
                  color="primary"
                  min="0"
                  max="100"
                  :rules="[rules.required, rules.number, rules.percentage]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  class="font-weight-bold py-5"
                >
                  SEND
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>

      <!-- Seção de Título DATA -->
      <v-container class="mt-8 mb-8 text-center">
        <h2 class="text-h4 font-weight-bold text-text">DATA</h2>
        <p class="text-subtitle-1 text-grey-darken-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </v-container>

      <!-- Seção de Tabela e Gráfico -->
      <v-container class="pb-8 px-4">
        <v-row dense>
          <v-col cols="12" lg="6">
            <ParticipantsTable
              :participants="participants"
              :headers="tableHeaders"
              @delete-participant="handleDeleteParticipant"
            />
          </v-col>

          <v-col cols="12" lg="6">
            <ParticipantsChart
              :participants="participants"
              :totalParticipation="totalParticipation"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- Snackbar para mensagens de sucesso/erro -->
      <v-snackbar
        v-model="showSnackbar"
        :timeout="snackbarTimeout"
        :color="snackbarColor"
        bottom
        right
      >
        {{ snackbarMessage }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="showSnackbar = false">Fechar</v-btn>
        </template>
      </v-snackbar>

      <!-- Dialog de Confirmação -->
      <ConfirmDialog
        :modelValue="showConfirmDialog"
        @update:modelValue="showConfirmDialog = $event"
        :message="confirmMessage"
        @confirmed="onConfirmDelete"
      />
    </v-main>
  </v-app>
</template>

<script>
import ParticipantsTable from '@/components/ParticipantsTable.vue';
import ParticipantsChart from '@/components/ParticipantsChart.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { participantDataService } from '@/services/participantDataService';

// Removida a importação da imagem do assets, pois não é mais usada no template
// import cotaboxLogo from '@/assets/Logotipo_cotabox_SemFundo.png';

export default {
  name: 'HomeView',
  components: { ParticipantsTable, ParticipantsChart, ConfirmDialog },
  data() {
    return {
      // Removida a propriedade da imagem do data
      // cotaboxLogo: cotaboxLogo,
      firstName: '',
      lastName: '',
      participation: '',

      // Snackbar state
      showSnackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
      snackbarTimeout: 5000,

      participants: [],
      totalParticipation: 0,

      showConfirmDialog: false,
      confirmMessage: '',
      participantToDeleteId: null,

      // Table Headers - Reverted to default for better responsiveness
      tableHeaders: [
        { title: 'ID', key: 'id', align: 'start', sortable: false },
        { title: 'First Name', key: 'firstName', align: 'start', sortable: false },
        { title: 'Last Name', key: 'lastName', align: 'start', sortable: false },
        { title: 'Participation (%)', key: 'participation', align: 'end', sortable: false },
        { title: 'Actions', key: 'actions', align: 'center', sortable: false },
      ],
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        number: value => !isNaN(parseFloat(value)) && isFinite(value) || 'Deve ser um número.',
        percentage: value => (value >= 0 && value <= 100) || 'Participação deve ser entre 0 e 100.',
      },
    };
  },
  mounted() {
    this.fetchParticipants();
  },
  methods: {
    showAppSnackbar(message, color = 'success') {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },

    async fetchParticipants() {
      try {
        const data = await participantDataService.fetchAllParticipants();
        this.participants = data.participants;
        this.totalParticipation = data.totalParticipation;
      } catch (error) {
        console.error('Error fetching participants:', error);
        this.showAppSnackbar('Error loading participants. Please check backend.', 'error');
      }
    },

    async handleSubmit() {
      const newParticipation = Number(this.participation);

      // Validação usando as regras
      const isFormValid = this.rules.required(this.firstName) === true &&
                          this.rules.required(this.lastName) === true &&
                          this.rules.required(this.participation) === true &&
                          this.rules.number(this.participation) === true &&
                          this.rules.percentage(this.participation) === true;

      if (!isFormValid) {
        this.showAppSnackbar('Por favor, preencha todos os campos corretamente. A participação deve ser entre 0 e 100.', 'warning');
        return;
      }

      const validation = participantDataService.validateParticipation(this.participants, newParticipation);
      if (!validation.isValid) {
        this.showAppSnackbar(validation.errorMessage, 'warning');
        return;
      }

      try {
        await participantDataService.addNewParticipant({
          firstName: this.firstName,
          lastName: this.lastName,
          participation: newParticipation
        });

        await this.fetchParticipants();
        this.firstName = '';
        this.lastName = '';
        this.participation = '';
        this.showAppSnackbar('Participante adicionado com sucesso!', 'success');
      } catch (error) {
        console.error('Error adding participant:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.message || 'Error adding participant. Please try again.';
        this.showAppSnackbar(errorMessage, 'error');
      }
    },

    handleDeleteParticipant(id) {
      this.participantToDeleteId = id;
      this.confirmMessage = 'Tem certeza que deseja excluir este participante? Esta ação não pode ser desfeita.';
      this.showConfirmDialog = true;
    },

    async onConfirmDelete(confirmed) {
      if (confirmed && this.participantToDeleteId) {
        try {
          await participantDataService.removeParticipant(this.participantToDeleteId);
          await this.fetchParticipants();
          this.showAppSnackbar('Participante excluído com sucesso!', 'success');
        } catch (error) {
          console.error('Error deleting participant:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || error.message || 'Error deleting participant. Please try again.';
          this.showAppSnackbar(errorMessage, 'error');
        } finally {
          this.participantToDeleteId = null;
        }
      } else {
        this.showAppSnackbar('Exclusão cancelada.', 'info');
      }
    },
  },
};
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
