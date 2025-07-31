<template>
  <!-- eslint-disable vue/valid-v-slot --> 
  <v-card class="pa-4" elevation="0">
    <v-card-title class="text-h6 font-weight-bold mb-4 text-text">
      Dados dos Participantes
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="participants"
      item-key="_id"
      class="elevation-0"
      density="compact"
      hide-default-footer
      disable-pagination
    >
      <!-- Slot para customizar a célula de ID (para mostrar index + 1) -->
      <template v-slot:item.id="{ index }">
        {{ index + 1 }}
      </template>

      <!-- Slot para customizar a célula de Ações (botão Excluir) -->
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="error"
          size="small"
          @click="confirmDelete(item._id)"
          class="font-weight-bold"
        >
          Excluir
        </v-btn>
      </template>

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
    confirmDelete(id) {
      console.log('Botão Excluir clicado para ID:', id);
      this.$emit('delete-participant', id);
    },
  },
};
</script>

<style scoped>
</style>
