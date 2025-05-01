<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>

module.exports = {
  name: 'LineChart',
  data() {
    return {};
  },
  mounted() {
    this.createChart();
  },
  methods: {
    async createChart() {
      // Giả sử bạn đã load dữ liệu CSV thành JSON
      const data = await fetch('./data.csv')
        .then(response => response.text())
        .then(text => this.parseCSV(text));

      const labels = data.map(item => item.timestamp);
      const temperatures = data.map(item => item.temperature);
      const humidities = data.map(item => item.humidity);
      const soilMoistures = data.map(item => item.soilMoisture);

      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Nhiệt độ (°C)',
              data: temperatures,
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.1)',
              fill: false,
              tension: 0.4
            },
            {
              label: 'Độ ẩm (%)',
              data: humidities,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,0,255,0.1)',
              fill: false,
              tension: 0.4
            },
            {
              label: 'Độ ẩm đất (%)',
              data: soilMoistures,
              borderColor: 'green',
              backgroundColor: 'rgba(0,255,0,0.1)',
              fill: false,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Thời gian (Ngày giờ)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Giá trị'
              }
            }
          }
        }
      });
    },

    // Hàm parse CSV đơn giản
    parseCSV(text) {
      const lines = text.trim().split('\n');
      return lines.map(line => {
        const [timestamp, temperature, humidity, soilMoisture] = line.split(',').map(item => item.trim());
        return {
          timestamp,
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          soilMoisture: parseInt(soilMoisture)
        };
      });
    }
  }
};
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
