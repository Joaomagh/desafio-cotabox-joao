<template>
  <div class="participant-table">
    <h2>Dados dos Participantes</h2>
    <table v-if="participants.length" class="participants-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Primeiro Nome</th>
          <th>Sobrenome</th>
          <th>Participação (%)</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in participants" :key="p._id || index">
          <td>{{ index + 1 }}</td>
          <td>{{ p.firstName }}</td>
          <td>{{ p.lastName }}</td>
          <td>{{ p.participation }}%</td>
          <td>
            <button @click="confirmDelete(p._id)" class="delete-button">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty">Nenhum participante ainda.</p>
  </div>
</template>

<script>
export default {
  name: 'ParticipantTable',
  props: {
    participants: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    confirmDelete(id) {
      // ADICIONADO PARA DEPURAR: Verifica se o método está sendo chamado
      console.log('Botão Excluir clicado para ID:', id); 
      this.$emit('delete-participant', id);
    },
  },
};
</script>

<style scoped>
.participant-table {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}
.delete-button:hover {
  background-color: #c82333;
}
.empty {
  margin-top: 2rem;
  font-style: italic;
}
</style>
