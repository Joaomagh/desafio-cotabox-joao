// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'cotaboxTheme',
    themes: {
      cotaboxTheme: {
        dark: false,
        colors: {
          primary: '#36A2EB', // Header and button blue
          secondary: '#FF6384',
          accent: '#FFCE56',
          background: '#F5F5F5', // General page background
          surface: '#FFFFFF', // Card and surface background
          text: '#333333', // Default text color
          border: '#D1D5DB', // Input and table border color
          tableHead: '#F2F2F2', // Table header background color
          error: '#dc3545', 
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');
