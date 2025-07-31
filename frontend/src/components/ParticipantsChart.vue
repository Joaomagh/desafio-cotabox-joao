<template>
  <v-card class="pa-4" elevation="0">
    <v-card-title class="text-h6 font-weight-bold mb-4 text-text">
      Distribuição de Participações
    </v-card-title>
    <div class="relative w-full max-w-sm mx-auto">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
    
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
      return {
        labels: this.participants.map(p => `${p.firstName} ${p.lastName}`),
        datasets: [
          {
            data: this.participants.map(p => p.participation),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
              '#8A2BE2', '#7FFF00', '#DC143C', '#00FFFF', '#FFA07A', '#20B2AA'
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
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
            display: false,
          },
          tooltip: {
            callbacks: {
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
        cutout: '70%', 
      }
    },
  },
}
</script>

<style scoped>

</style>
