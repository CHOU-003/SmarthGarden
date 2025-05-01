<template>
    <div class="history-container">
      <h2>Lịch sử bật máy bơm (Độ ẩm đất dưới 30%)</h2>
      <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <ul v-else>
        <li v-for="(entry, index) in filteredData" :key="index">
          <strong>{{ entry.timestamp }}</strong> - Độ ẩm đất: {{ entry.soilMoisture }}%
        </li>
        <li v-if="filteredData.length === 0">Không có lần nào độ ẩm đất dưới 30%</li>
      </ul>
    </div>
  </template>
  
  <script>
 module.exports = {
  name: 'PumpHistory',
  data() {
    return {
      allData: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    filteredData() {
      const now = new Date();

      const vnOffset = 7 * 60 * 60 * 1000;
      const vnDate = new Date(now.getTime() + vnOffset);
      const todayStr = vnDate.toISOString().split('T')[0];

      return this.allData.filter(entry => {


        const entryDate = this.parseDate(entry.timestamp);

        const entryVN = new Date(entryDate.getTime() + vnOffset);
        const entryDateStr = entryVN.toISOString().split('T')[0];
        


        return entry.soilMoisture < 30 && entryDateStr === todayStr;
      });
    }
  },
  methods: {
  parseCSV(text) {
    return text.trim().split('\n')
      .map(line => {
        const cols = line.split(',').map(c => c.trim());
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
  
  parseDate(dateString) {
    try {
      // Chia tách ngày và giờ theo định dạng '1/5/2025 16:03'
      const [day, month, yearAndTime] = dateString.split('/');
      const [year, time] = yearAndTime.split(' ');
      const [hour, minute] = time.split(':');


      const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00`;


      const date = new Date(formattedDate);
      

      if (isNaN(date)) {
        return new Date();  
      }
      return date;
    } catch (e) {
      return new Date();  
    }
  }
},

  async mounted() {
    try {
      const response = await fetch('./data.csv');
      if (!response.ok) throw new Error('Không thể tải file CSV');
      const text = await response.text();
      this.allData = this.parseCSV(text);
      console.log("Dữ liệu CSV:", this.allData); 
    } catch (err) {
      this.error = `Lỗi: ${err.message}`;
    } finally {
      this.loading = false;
    }
  }
};

  </script>
  
  <style scoped>
  .history-container {
    background: #fff;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    max-width: 600px;
    margin: 1rem auto;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    font-size: 1rem;
  }
  
  h2 {
    text-align: center;
    color: #2c3e50;
  }
  
  .loading, .error {
    text-align: center;
    padding: 1rem;
    font-size: 1.1rem;
  }
  
  .error {
    color: red;
  }
  </style>
  