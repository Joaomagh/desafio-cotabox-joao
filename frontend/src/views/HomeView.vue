<template>
  <div>
    <!-- Header Section -->
    <v-app-bar color="primary" flat>
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

    <!-- Footer Section with Cotabox Logo -->
    <v-footer app class="bg-surface py-2">
      <v-container fluid class="text-center py-0">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-img
              :src="cotaboxLogo"
              alt="Logotipo Cotabox"
              contain
              height="25"
              max-width="120"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import ParticipantsTable from '@/components/ParticipantsTable.vue';
import ParticipantsChart from '@/components/ParticipantsChart.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { participantDataService } from '@/services/participantDataService';

import cotaboxLogo from '@/assets/Logotipo_cotabox_SemFundo.png';

export default {
  name: 'HomeView',
  components: { ParticipantsTable, ParticipantsChart, ConfirmDialog },
  data() {
    return {
      cotaboxLogo: cotaboxLogo,
      firstName: '',
      lastName: '',
      participation: '',

      showSnackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
      snackbarTimeout: 5000,

      participants: [],
      totalParticipation: 0,

      showConfirmDialog: false,
      confirmMessage: '',
      participantToDeleteId: null,

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
      // Validação dos campos obrigatórios individualmente
      if (!this.firstName) {
        this.showAppSnackbar('Por favor, preencha o campo "First Name".', 'warning');
        return;
      }
      if (!this.lastName) {
        this.showAppSnackbar('Por favor, preencha o campo "Last Name".', 'warning');
        return;
      }
      if (this.participation === '' || isNaN(Number(this.participation))) {
        this.showAppSnackbar('Por favor, preencha o campo "Participation" com um número válido.', 'warning');
        return;
      }

      const newParticipation = Number(this.participation);

      // Validação da porcentagem
      if (newParticipation < 0 || newParticipation > 100) {
        this.showAppSnackbar('A participação deve ser entre 0 e 100%.', 'warning');
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
