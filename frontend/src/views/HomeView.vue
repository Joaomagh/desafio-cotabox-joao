<template>
  <div id="app">
    <main>
      <h1>Formulário de Participação</h1>

      <form @submit.prevent="handleSubmit">
        <input v-model="firstName" placeholder="Nome" />
        <input v-model="lastName" placeholder="Sobrenome" />
        <input v-model.number="participation" type="number" placeholder="Participação (%)" />
        <button type="submit">Enviar</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

      <ParticipantsTable :participants="participants" />
      <ParticipantsChart :participants="participants" />
    </main>
  </div>
</template>

<script>
// 1. Importar os componentes filhos
import ParticipantsTable from '../components/ParticipantsTable.vue';
import ParticipantsChart from '../components/ParticipantsChart.vue';

// 2. Importar a biblioteca axios
import axios from 'axios'; // <--- LINHA ADICIONADA/CORRIGIDA AQUI

export default {
  // 3. Declarar os componentes que este componente usa
  components: { ParticipantsTable, ParticipantsChart },
  
  // 4. Dados reativos do componente
  data() {
    return {
      firstName: '',
      lastName: '',
      participation: '',
      errorMessage: '',
      participants: [], // Array que armazenará os dados dos participantes
    };
  },
  
  // 5. Hook de ciclo de vida: executado quando o componente é montado no DOM
  mounted() {
    // Ao montar o componente, busca os participantes existentes na API
    this.fetchParticipants();
  },
  
  // 6. Métodos do componente
  methods: {
    // Método para buscar os participantes da API
    async fetchParticipants() {
      try {
        // Faz uma requisição GET para a API do backend
        const response = await axios.get('http://localhost:3000/participants');
        
        // A linha abaixo: "this.participants = response.data;"
        // Significa que o array de participantes retornado pelo seu backend
        // (ex: [{"firstName":"ana","lastName":"vasconcelos","participation":50}])
        // é diretamente atribuído à propriedade 'participants' do seu componente Vue.
        // O '.data' é onde o axios coloca o corpo da resposta HTTP.
        this.participants = response.data; 

        // Limpa qualquer mensagem de erro anterior, caso a busca seja bem-sucedida
        this.errorMessage = ''; 
      } catch (error) {
        // Se houver um erro na requisição GET (ex: backend não está rodando)
        console.error('Erro ao buscar participantes:', error);
        this.errorMessage = 'Erro ao carregar participantes. Verifique se o backend está rodando.';
      }
    },

    // Método para lidar com o envio do formulário
    async handleSubmit() {
      this.errorMessage = ''; // Limpa a mensagem de erro anterior, se houver

      // Converte a participação para número, garantindo que seja um tipo numérico
      const newParticipation = Number(this.participation);

      // Validação básica dos campos no frontend
      if (!this.firstName || !this.lastName || isNaN(newParticipation) || newParticipation < 0 || newParticipation > 100) {
        this.errorMessage = 'Preencha todos os campos corretamente. A participação deve ser um número entre 0 e 100.';
        return; // Interrompe a execução do método se a validação falhar
      }

      // Soma das participações atuais para validação de 100% no frontend
      const total = this.participants.reduce((sum, p) => sum + Number(p.participation), 0);
      const newTotal = total + newParticipation;

      if (newTotal > 100) {
        this.errorMessage = `A soma das participações ultrapassa 100%. Total atual: ${total}%.`;
        return; // Interrompe a execução se a soma exceder 100%
      }

      try {
        // Faz uma requisição POST para a API do backend para adicionar o novo participante
        const response = await axios.post('http://localhost:3000/participants', {
          firstName: this.firstName,
          lastName: this.lastName,
          participation: newParticipation
        });

        // Após adicionar com sucesso, busca a lista atualizada de participantes
        await this.fetchParticipants(); 
        
        // Limpa os campos do formulário
        this.firstName = '';
        this.lastName = '';
        this.participation = '';
        this.errorMessage = ''; // Limpa a mensagem de erro após o sucesso
      } catch (error) {
        // Se houver um erro na requisição POST
        console.error('Erro ao adicionar participante:', error.response?.data || error.message);
        
        // Exibe a mensagem de erro do backend, se disponível, ou uma mensagem genérica
        // O seu backend atual retorna { error: 'Mensagem de erro' }
        this.errorMessage = 'Erro ao adicionar participante: ' + (error.response?.data?.error || error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Seus estilos CSS permanecem os mesmos */
main {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}
input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  background-color: #007bff; /* Adicionei uma cor para o botão */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3; /* Efeito hover */
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
