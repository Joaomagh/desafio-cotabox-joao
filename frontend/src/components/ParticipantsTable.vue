<template>
  <!-- eslint-disable --> <!-- Desativa o ESLint para este arquivo, se necessário, mas considere resolver os warnings. -->
  <v-card class="pa-4" elevation="2">
    <v-card-title class="text-h6 font-weight-bold mb-4 text-text">
      Dados dos Participantes
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="participants"
      item-key="_id"
      class="elevation-0 custom-table"
      density="compact"
      hide-default-footer
      disable-pagination
    >
      <!-- Slot para customizar a célula de ID (mostra index + 1) -->
      <template v-slot:item.id="{ index }">
        {{ index + 1 }}
      </template>

      <!-- Slot para customizar a célula de Participação (adiciona '%') -->
      <template v-slot:item.participation="{ item }">
        {{ item.participation }}%
      </template>

      <!-- Slot para customizar a célula de Ações (botão Excluir com ícone de lixeira) -->
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          size="small"
          color="error"
          variant="text"
          @click="confirmDelete(item._id)"
          class="font-weight-bold"
        >
          <v-icon>mdi-delete</v-icon> 
        </v-btn>
      </template>

      <!-- Slot para quando não houver dados na tabela -->
      <template v-slot:no-data>
        <p class="text-center text-grey-darken-1 py-4">Nenhum participante ainda.</p>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'ParticipantsTable',
  props: {
    participants: {
      type: Array,
      required: true,
      default: () => [],
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * Emite um evento para o componente pai para confirmar a exclusão de um participante.
     * @param {string} id - O ID do participante a ser excluído.
     */
    confirmDelete(id) {
      this.$emit('delete-participant', id); 
    },
  },
};
</script>

<style scoped>
.custom-table .v-data-table__wrapper {
  border: 1px solid var(--v-border-base); 
  border-radius: 8px; 
  overflow: hidden; /* Garante que a borda arredondada funcione corretamente. */
}

.custom-table thead {
  background-color: var(--v-tableHead-base); 
}

.custom-table th {
  font-weight: bold !important;
  color: var(--v-text-base) !important;
}
</style>
