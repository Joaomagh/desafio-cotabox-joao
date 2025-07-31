// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Importa a instância configurada do Vuetify do arquivo de plugin
import vuetify from './plugins/vuetify';

// Cria a aplicação Vue
createApp(App)
  .use(router) // Usa o Vue Router
  .use(vuetify) // Usa a instância do Vuetify configurada
  .mount('#app'); // Monta a aplicação no elemento com id 'app'
