<template>
    <b-row style="margin-top:5%;margin-left:5%;margin-right:5%;">
      <b-row>
          <b-col cols="4">
              <canvas ref="temp" height="210"></canvas>
          </b-col>
          <b-col cols="4">
              <canvas ref="humidity" height="210"></canvas>
          </b-col>
          <b-col cols="4">
              <canvas ref="soilMoisture" height="210"></canvas>
          </b-col>
    </b-row>
      <b-col cols="12">
          <b-pagination v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                        style="float:right;"></b-pagination>
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
<style scoped>

</style>
<script>
module.exports = {
  data() {
      return {
          perPage: 5,
          currentPage: 1,
          items: [],
          client: undefined,
          isMonitoring:false,
          temp:[],
          tempLabels:[],
          tmpChart:undefined,
          humidity:[],
          humLabels:[],
          humChart:undefined,
          soilMoisture:[],
          soilLabels:[],
          soilChart:undefined,
      }
  },
  mounted(){
      this.retrieveData();
      this.monitor();
      this.createChart();
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
      createChart(){
          var context = this.$refs['temp'].getContext("2d")
          this.tmpChart = new Chart(context,{
                              type: 'line',
                              data: {
                              labels: this.tempLabels,
                              datasets: [
                                          {
                                              label: "Temperature (°C)",
                                              fill: true,
                                              backgroundColor: "rgba(255,99,132,0.2)",
                                              borderColor: "rgba(255,99,132,1)",
                                              borderWidth:1,
                                              lineTension: .0,
                                              pointRadius: 1,
                                              data: this.temp
                                          }
                                      ]
                              },
                              options: {
                                  plugins: {
                                      title: {
                                          display: true,
                                          text: 'Temperature'
                                      }
                                  },
                                  scales: {
                                      y: {
                                          min: -10,
                                          max: 60,
                                          title: {
                                              display: true,
                                              text: '°C'
                                          }
                                      }
                                  }
                              }
                          });

          var context2 = this.$refs['humidity'].getContext("2d")
          this.humChart = new Chart(context2,{
                          type: 'line',
                          data: {
                          labels: this.humLabels,
                          datasets: [
                                      {
                                          label: "Humidity (%)",
                                          fill: true,
                                          backgroundColor: "rgba(179,181,198,0.2)",
                                          borderColor: "rgba(179,181,198,1)",
                                          borderWidth:1,
                                          lineTension: .0,
                                          pointRadius: 1,
                                          data: this.humidity
                                      }
                                  ]
                          },
                          options: {
                                  plugins: {
                                      title: {
                                          display: true,
                                          text: 'Humidity'
                                      }
                                  },
                                  scales: {
                                      y: {
                                          min: 0,
                                          max: 100,
                                          title: {
                                              display: true,
                                              text: '%'
                                          }
                                      }
                                  }
                              }
                      });
                      
          var context3 = this.$refs['soilMoisture'].getContext("2d")
          this.soilChart = new Chart(context3,{
                          type: 'line',
                          data: {
                          labels: this.soilLabels,
                          datasets: [
                                      {
                                          label: "Soil Moisture (%)",
                                          fill: true,
                                          backgroundColor: "rgba(90,181,198,0.2)",
                                          borderColor: "rgba(90,181,198,1)",
                                          borderWidth:1,
                                          lineTension: .0,
                                          pointRadius: 1,
                                          data: this.soilMoisture
                                      }
                                  ]
                          },
                          options: {
                                  plugins: {
                                      title: {
                                          display: true,
                                          text: 'Soil Moisture'
                                      }
                                  },
                                  scales: {
                                      y: {
                                          min: 0,
                                          max: 100,
                                          title: {
                                              display: true,
                                              text: '%'
                                          }
                                      }
                                  }
                              }
                      });                  
      },
      retrieveData(){
        axios.get('http://localhost:1882/dataset')
            .then((resp) => { 
            this.items = resp.data;

            // Ghi dữ liệu biểu đồ
            this.temp = this.items.map(d => d.temperature)
            this.tempLabels = this.items.map(d => new Date(d.timestamp).toLocaleTimeString())

            this.humidity = this.items.map(d => d.humidity)
            this.humLabels = this.items.map(d => new Date(d.timestamp).toLocaleTimeString())

            this.soilMoisture = this.items.map(d => d.soilMoisture)
            this.soilLabels = this.items.map(d => new Date(d.timestamp).toLocaleTimeString())

            if (this.tmpChart) this.tmpChart.update();
            if (this.humChart) this.humChart.update();
            if (this.soilChart) this.soilChart.update();
            })
            .catch(errors => { console.error(errors) })
        },
      monitor(){
              this.isMonitoring = !this.isMonitoring;  
              if(this.isMonitoring){ this.connect(); }
              else{  }
          },
          connect() {
                let self = this;
                let clientid = 'iot-client-' + Math.floor(Math.random() * 10000);
                
                self.client = new Paho.Client("test.mosquitto.org",Number("8080"),clientid);


                self.client.onConnectionLost = onConnectionLost;
                self.client.onMessageArrived = onMessageArrived;

                self.client.connect({
                    onSuccess: onConnect,
                    keepAliveInterval: 15,
                    useSSL: false,  
                });

                function onConnect() {
                    self.client.subscribe("/MQTT/SoilMoisture");
                    self.client.subscribe("/MQTT/Temp");
                    self.client.subscribe("/MQTT/Humidity");
                }

                function onConnectionLost(responseObject) {
                    console.error("Connection lost:", responseObject.errorMessage);
                }

                function onMessageArrived(message) {
                    var tmp = 0;
                    var d = new Date();
                    var n = d.toLocaleTimeString();

                    if(message.destinationName == "/MQTT/Temp"){
                        self.items[0].sensor_reading = Number(message.payloadString).toFixed(2)+" °C";
                        tmp = Number(message.payloadString).toFixed(2);
                        if(self.tempLabels.length < 10){
                            self.temp.push(tmp)
                            self.tempLabels.push(n)
                        } else {
                            self.temp.shift();
                            self.tempLabels.shift();
                            self.temp.push(tmp);
                            self.tempLabels.push(n);
                        }
                       
                     
                        if(self.tmpChart!=null)
                            self.tmpChart.update('none')
                    }
                    
                    if (message.destinationName == "/MQTT/Humidity"){
                        self.items[1].sensor_reading = Number(message.payloadString).toFixed(2)+" %";
                        tmp = Number(message.payloadString).toFixed(2);
                        if(self.humLabels.length < 10){
                           self.humidity.push(tmp)
                           self.humLabels.push(n)
                        } else {
                           self.humidity.shift();
                           self.humLabels.shift();
                           self.humidity.push(tmp);
                           self.humLabels.push(n);
                        }
                       
                        if(self.humChart!=null)
                            self.humChart.update('none')
                    }

                    if (message.destinationName == "/MQTT/SoilMoisture"){
                        self.items[2].sensor_reading = message.payloadString+"  ATM";
                        tmp = Number(message.payloadString).toFixed(2);
                        if(self.soilLabels.length < 10){
                           self.soilMoisture.push(tmp)
                           self.soilLabels.push(n)
                        } else {
                           self.soilMoisture.shift();
                           self.soilLabels.shift();
                           self.soilMoisture.push(tmp);
                           self.soilLabels.push(n);
                        }
                       
                        if(self.soilChart!=null)
                            self.soilChart.update('none')
                    }
                }
            },
          beforeDestroy(){
              if(this.client!=undefined){
                  this.client.disconnect();
                  console.log("Terminate MQTT")
              }
          },
          disconnect(){
              if(this.client!=undefined){ this.client.disconnect(); }
          },
  }, 
}
</script>