<template>
  <b-row style="margin-top:5%;margin-left:5%;margin-right:5%;">
    <b-col cols="12">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        style="float:right;"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="[
          { key: 'timestamp', label: 'Thời Gian' },
          { key: 'temperature', label: 'Nhiệt Độ (°C)' },
          { key: 'humidity', label: 'Độ ẩm không khí (%)' },
          { key: 'soilMoisture', label: 'Độ ẩm đất (%)' }
        ]"
        small
      ></b-table>
    </b-col>
  </b-row>
</template>

<script>
module.exports = {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: []
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      fetch('http://localhost:1882/dataset')
        .then(res => res.json())
        .then(data => {
          this.items = data;
        })
        .catch(err => {
          console.error("Lỗi fetch JSON:", err);
        });
    }
  }
};
</script>
