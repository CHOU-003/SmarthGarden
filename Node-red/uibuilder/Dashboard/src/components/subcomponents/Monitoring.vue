<template>
  <div class="chart-container">
    <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="chart-wrapper">
        <h3>Nhiệt độ không khí (°C)</h3>
        <canvas ref="tempChart" v-show="!loading"></canvas>
      </div>
      <div class="chart-wrapper">
        <h3>Độ ẩm không khí (%)</h3>
        <canvas ref="humidityChart" v-show="!loading"></canvas>
      </div>
      <div class="chart-wrapper">
        <h3>Độ ẩm đất (%)</h3>
        <canvas ref="soilChart" v-show="!loading"></canvas>
      </div>
    </div>
  </div>
</template>

<script>

const Chart = window.Chart;

module.exports = {
  name: 'SeparateCharts',
  data() {
    return {
      chartData: [],
      loading: true,
      error: null,
      charts: []
    };
  },
  async mounted() {
  try {
    // Load CSV
    const response = await fetch('./data.csv');
    if (!response.ok) throw new Error('Không thể tải file CSV');
    const csvText = await response.text();
    this.chartData = this.parseCSV(csvText);

    // Đặt loading = false TRƯỚC khi render để DOM hiển thị canvas
    this.loading = false;

    // Đợi DOM cập nhật xong (canvas hiển thị)
    await this.$nextTick();

    // Tạo biểu đồ
    this.initCharts();
  } catch (err) {
    this.error = `Lỗi: ${err.message}`;
    console.error('Lỗi khi khởi tạo:', err);
  }
},
  beforeUnmount() {
    // Hủy các chart khi component unmount
    this.charts.forEach(chart => chart && chart.destroy());
  },
  methods: {
    parseCSV(text) {
      return text.trim().split('\n')
        .map(line => {
          const cols = line.split(',').map(col => col.trim());
          if (cols.length < 4 || !cols[0]) return null;
          
          return {
            timestamp: cols[0],
            temperature: parseFloat(cols[1]) || 0,
            humidity: parseFloat(cols[2]) || 0,
            soilMoisture: parseInt(cols[3]) || 0
          };
        })
        .filter(Boolean);
    },

    initCharts() {
      // Kiểm tra từng canvas tồn tại
      const canvasRefs = ['tempChart', 'humidityChart', 'soilChart'];
      const missingCanvas = canvasRefs.find(ref => !this.$refs[ref]);
      
      if (missingCanvas) {
        throw new Error(`Không tìm thấy canvas: ${missingCanvas}`);
      }

      // Tạo các chart
      this.charts = [
        this.createChart('tempChart', 'temperature', 'Nhiệt độ không khí', '#ff6384', '°C'),
        this.createChart('humidityChart', 'humidity', 'Độ ẩm không khí', '#36a2eb', '%'),
        this.createChart('soilChart', 'soilMoisture', 'Độ ẩm đất', '#4bc0c0', '%')
      ];
    },

    createChart(refName, dataKey, label, color, unit) {
      const ctx = this.$refs[refName].getContext('2d');
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.map(d => d.timestamp),
          datasets: [{
            label: label,
            data: this.chartData.map(d => d[dataKey]),
            borderColor: color,
            backgroundColor: `${color}20`,
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}${unit}`
              }
            }
          },
          scales: {
            x: { title: { display: true, text: 'Thời gian' } },
            y: { 
              title: { display: true, text: `${label} (${unit})` },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};

</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.chart-wrapper {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 400px;
  position: relative;
}

.chart-wrapper h3 {
  margin: 0 0 1rem 0;
  text-align: center;
  color: #333;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #ff4444;
}
</style>