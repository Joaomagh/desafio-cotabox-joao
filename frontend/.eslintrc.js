module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier' // Se você usa Prettier
  ],
  parserOptions: {
    parser: '@babel/eslint-parser', // Para JavaScript
    requireConfigFile: false, // Necessário para @babel/eslint-parser em algumas configurações
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/valid-v-slot': 'off',
    'vue/multi-word-component-names': 'off', // Permite nomes de componentes de uma palavra (ex: App.vue)
    'no-unused-vars': 'off', // <-- ADICIONADO: Desativa o erro para variáveis não utilizadas
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
