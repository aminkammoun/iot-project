<template>
  <div style="margin: auto; width: 90%">
    <div style="height: 250px" class="mt-5">
      <v-row>
        <!-- <v-col cols="6" md="3" xs="6" sm="6" class="text-center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 24 : 0"
                class="mx-auto gradient-batterie"
                dark
                width="100%"
                color="#27AE60"
              >
                <v-row>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-title>
                      <v-icon large style="margin: auto">mdi-battery </v-icon>
                    </v-card-title></v-col
                  >
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-text class="text-lg-h2 font-weight-bold">
                      {{ varbatSensor }}
                    </v-card-text>
                  </v-col></v-row
                >
                <v-card-text class="text-lg-h6">battery </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col> -->

        <v-col cols="6" md="3" xs="6" sm="6" class="text-center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 24 : 0"
                class="ma-auto gradient-Temp"
                dark
                width="100%"
                color="#e74c3c"
              >
                <v-row>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-title>
                      <i
                        class="ri-temp-hot-fill"
                        style="font-size: 50px; margin: auto"
                      ></i> </v-card-title
                  ></v-col>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-text class="text-lg-h2 font-weight-bold">
                      {{ vartempSensor }}
                    </v-card-text>
                  </v-col></v-row
                >
                <v-card-text class="text-lg-h6">temperature </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col cols="6" md="3" xs="6" sm="6" class="text-center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 24 : 0"
                class="ma-auto gradient-ambe"
                dark
                width="100%"
                color="#26c6da"
              >
                <v-row>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-title>
                      <i
                        class="ri-meteor-fill"
                        style="font-size: 50px; margin: auto"
                      ></i> </v-card-title
                  ></v-col>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-text class="text-lg-h2 font-weight-bold">
                      {{ varhumiSensor }}
                    </v-card-text>
                  </v-col></v-row
                >
                <v-card-text class="text-lg-h6">humidity</v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>

        <!-- <v-col cols="6" md="3" xs="6" sm="6" class="text-center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 24 : 0"
                class="mx-auto gradient-CO2"
                color="#26c6da"
                dark
                width="100%"
              >
                <v-row>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-title>
                      <i
                        class="ri-windy-line"
                        style="font-size: 50px; margin: auto"
                      ></i> </v-card-title
                  ></v-col>
                  <v-col cols="6" sm="6" lg="12">
                    <v-card-text class="text-lg-h2 font-weight-bold">
                      {{ varcoSensor }}
                    </v-card-text>
                  </v-col></v-row
                >

                <v-card-text class="text-lg-h6">CO2 </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col> -->
      </v-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    status: Boolean,
  },
  data() {
    return {
      amine: 0,
      sensors: null,
      vartempSensor: 0,
      varhumiSensor: 0,
      varcoSensor: 0,
      varbatSensor: 0,
    }
  },
  methods: {
    /* Sensors(topic, name) {
      client.on("connect", () => {
        console.log("Connected");
        client.subscribe("sensor/Temp", () => {
          console.log(`Subscribe to topic `);
        });
      });
    }, */
    /*=============ROS Bridge config ==================*/
    /*humiditySensor() {
      setTimeout(() => {
        this.sensors = new ROSLIB.Topic({
          ros: this.ros,
          name: "/Humi",
          messageType: "std_msgs/UInt16",
        });
        this.sensors.subscribe((actionResult) => {
          this.varhumiSensor = actionResult.data;
        });
      }, 1000);
    },
    tempSensor() {
      setTimeout(() => {
        this.sensors = new ROSLIB.Topic({
          ros: this.ros,
          name: "/Temp",
          messageType: "std_msgs/UInt16",
        });
        this.sensors.subscribe((actionResult) => {
          this.vartempSensor = actionResult.data;
        });
      }, 1000);
    },
    coSensor() {
      setTimeout(() => {
        this.sensors = new ROSLIB.Topic({
          ros: this.ros,
          name: "/CO2",
          messageType: "std_msgs/UInt16",
        });
        this.sensors.subscribe((actionResult) => {
          this.varcoSensor = actionResult.data;
        });
      }, 1000);
      if (this.varcoSensor > 400 && this.varcoSensor < 600) {
        console.log("excellente");
      } else if (this.varcoSensor > 700 && this.varcoSensor < 1000) {
        console.log("fair good");
      } else if (this.varcoSensor > 1100 && this.varcoSensor < 1500) {
        console.log("mediocre");
      }
    },
    batSensor() {
      setTimeout(() => {
        this.sensors = new ROSLIB.Topic({
          ros: this.ros,
          name: "/Batt",
          messageType: "std_msgs/UInt16",
        });
        this.sensors.subscribe((actionResult) => {
          this.varbatSensor = actionResult.data;
        });
      }, 1000);
    },*/
    tempSensor() {
      axios.get('http://localhost:5002/api/mqtt/temp').then((res) => {
        this.vartempSensor = res.data.temp
      })
    },
    /* humSensor() {
      axios.get('http://localhost:5002/api/mqtt/hum').then((res) => {
        this.varhumiSensor = res.data.hum
      })
    }, */
  },
  mounted() {
    this.tempSensor()
    //this.humSensor()
    setInterval(() => {
      this.tempSensor()
      //this.humSensor()
    }, 60000)
    //this.batSensor()
    /*this.humiditySensor();
    this.coSensor();
    this.tempSensor();
    
    //this.Sensors("/Humi", "varhumiSensor");
    this.Sensors("/Temp", "vartempSensor");
    this.Sensors("/CO2", "varcoSensor");
    this.Sensors("/Batt", "varbatSensor"); */
    //console.log(this.varhumiSensor);
    //this.Sensors();
  },
  destroyed() {},
}
</script>
<style lang="css" scoped>
.colone {
  border: solid 1px black;
  border-radius: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  height: 450px;
}
.colonetwo {
  border: solid 1px black;
  border-radius: 5px;

  background-repeat: no-repeat;
  height: 450px;
}
</style>
