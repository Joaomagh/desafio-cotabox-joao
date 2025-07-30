<template>
  <table v-if="participants.length" class="participants-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Participação (%)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, index) in participants" :key="index">
        <td>{{ p.firstName }}</td>
        <td>{{ p.lastName }}</td>
        <td>{{ p.participation }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else class="empty">Nenhum participante ainda.</p>
</template>

<script>
export default {
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.participants-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
.empty {
  margin-top: 2rem;
  font-style: italic;
}
</style>
