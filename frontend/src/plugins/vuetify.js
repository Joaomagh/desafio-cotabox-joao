// frontend/src/plugins/vuetify.js

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Importa os estilos base do Vuetify
import 'vuetify/styles';

// Importa os ícones do Material Design Icons
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Garante que o CSS da fonte MDI é carregado

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Define MDI como o conjunto de ícones padrão
    aliases, // Inclui os aliases de ícones do MDI
    sets: {
      mdi, // Inclui o conjunto de ícones MDI
    },
  },
  theme: {
    defaultTheme: 'cotaboxTheme', // Define o tema padrão
    themes: {
      cotaboxTheme: {
        dark: false, // Define se o tema é claro ou escuro
        colors: {
          primary: '#36A2EB', // Cor principal (azul do cabeçalho e botões)
          secondary: '#FF6384', // Cor secundária
          accent: '#FFCE56', // Cor de destaque
          background: '#F5F5F5', // Cor de fundo geral da página
          surface: '#FFFFFF', // Cor de fundo para cards e superfícies
          text: '#333333', // Cor padrão do texto
          border: '#D1D5DB', // Cor da borda para inputs e tabelas
          tableHead: '#F2F2F2', // Cor de fundo do cabeçalho da tabela
          error: '#dc3545', // Cor para erros
          info: '#2196F3', // Cor para informações
          success: '#4CAF50', // Cor para sucesso
          warning: '#FFC107', // Cor para avisos
        },
      },
    },
  },
});
