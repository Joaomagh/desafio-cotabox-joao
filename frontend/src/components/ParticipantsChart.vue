<template>
  <v-card class="pa-4" elevation="2">
    <v-card-title class="text-h6 font-weight-bold mb-4 text-text">
      Distribuição de Participações
    </v-card-title>
    
    <!-- Contêiner responsivo para o gráfico de pizza -->
    <div class="relative w-full max-w-sm mx-auto">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    
    <!-- Mensagens de status da participação total -->
    <p v-if="totalParticipation > 100" class="text-orange-500 font-weight-bold text-sm mt-4 text-center">
      Atenção: A soma das participações ultrapassa 100%! Total atual: {{ totalParticipation }}%.
    </p>
    <p v-else-if="totalParticipation < 100 && participants.length > 0" class="text-blue-600 text-sm mt-4 text-center">
      Soma das participações: {{ totalParticipation }}% (Faltam {{ 100 - totalParticipation }}% para completar 100%).
    </p>
    <p v-else-if="totalParticipation === 100" class="text-green-600 font-weight-bold text-sm mt-4 text-center">
      Soma das participações: {{ totalParticipation }}%. Perfeito!
    </p>
    <p v-else class="text-gray-500 text-sm mt-4 text-center">Nenhum dado para exibir no gráfico.</p>
  </v-card>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

// Registra os elementos e plugins necessários do Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'ParticipantsChart',
  components: { Pie },
  props: {
    participants: {
      type: Array,
      required: true,
    },

    totalParticipation: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  computed: {
    chartData() {
      const fixedColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        '#8A2BE2', '#7FFF00', '#DC143C', '#00FFFF', '#FFA07A', '#20B2AA'
      ];

      return {
        labels: this.participants.map(p => `${p.firstName} ${p.lastName}`),
        datasets: [
          {
            data: this.participants.map(p => p.participation),
            backgroundColor: this.participants.map((_, index) => fixedColors[index % fixedColors.length]),
            borderColor: '#ffffff', 
            borderWidth: 2,
          },
        ],
      }
    },
    /**
     * Define as opções de configuração para o gráfico de pizza (Chart.js).
     * Controla a responsividade, legendas, tooltips, etc.
     */
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico não mantenha a proporção original
        plugins: {
          legend: { 
            position: 'bottom', 
            labels: {
              font: {
                family: 'Inter', 
              }
            }
          },
          title: {
            display: false, // Oculta o título padrão do Chart.js
          },
          tooltip: {
            callbacks: {
              // Customiza o texto exibido no tooltip
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed + '%';
                }
                return label;
              }
            }
          }
        },
        cutout: '50%', 
      }
    },
  },
}
</script>

<style scoped>
</style>
