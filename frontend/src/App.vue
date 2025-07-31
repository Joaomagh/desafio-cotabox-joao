<template>
  <div id="app">
    <!-- O router-view renderiza o componente da rota atual (ex: HomeView.vue) -->
    <router-view /> 
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globais para o body ou para toda a aplicação */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f0f2f5;
  /* Outros estilos globais aqui */
}
</style>
