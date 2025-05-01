<template>
    <div class="chart-container">
      <h3>{{ title }}</h3>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  module.exports = {
    props: ['chartData', 'title', 'label', 'unit', 'color'],
    watch: {
      chartData() {
        this.renderChart()
      }
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart() {
        if (!this.chartData) return
        if (this.chart) this.chart.destroy()
  
        this.chart = new Chart(this.$refs.canvas, {
          type: 'bar',
          data: {
            labels: this.chartData.labels,
            datasets: [{
              label: this.label,
              data: this.chartData.datasets[0].data,
              backgroundColor: this.color,
              borderColor: this.color.replace('0.5', '1'),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: this.unit
                }
              }
            }
          }
        })
      }
    },
    beforeUnmount() {
      if (this.chart) this.chart.destroy()
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    background-color: #e3e6e8;
    padding: 15px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    text-align: center;
  }
  </style>
  