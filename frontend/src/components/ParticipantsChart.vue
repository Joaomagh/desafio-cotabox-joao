<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
    <!-- NOVO: Exibir a soma total das participações -->
    <p v-if="totalParticipation > 100" class="warning-message">
      Atenção: A soma das participações ultrapassa 100%! Total atual: {{ totalParticipation }}%.
    </p>
    <p v-else-if="totalParticipation < 100 && participants.length > 0" class="info-message">
      Soma das participações: {{ totalParticipation }}% (Faltam {{ 100 - totalParticipation }}% para completar 100%).
    </p>
    <p v-else-if="totalParticipation === 100" class="success-message">
      Soma das participações: {{ totalParticipation }}%. Perfeito!
    </p>
    <p v-else class="empty-message">Nenhum dado para exibir no gráfico.</p>
  </div>
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
    totalParticipation: { // <-- NOVO PROP: Recebe a soma total do pai
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
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#8A2BE2', // Mais cores para mais participantes
              '#7FFF00',
              '#DC143C',
              '#00FFFF',
            ],
          },
        ],
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Distribuição de Participações (%)',
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
      }
    },
  },
}
</script>

<style scoped>
.warning-message {
  color: orange;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
.info-message {
  color: #007bff;
  margin-top: 10px;
  text-align: center;
}
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
.empty-message {
  margin-top: 10px;
  font-style: italic;
  text-align: center;
  color: #666;
}
</style>
