const express = require('express')
const router = express.Router()
const mqtt = require('mqtt')
const BrokerSchema = require("./schema");
//var client = mqtt.connect("mqtt://141.94.175.18:1883", options);
var client = mqtt.connect('mqtt://localhost:1883/mqtt')

var message = false
function getDatamqtt(params, topic, vv) {
  params.on('connect', () => {
    console.log('Connected')
  })

  setInterval(() => {
    params.subscribe(topic)
  }, 4000)
  params.on('message', (topic, payload) => {
    message = true
    this[`${vv}`] = payload.toString()
    console.log(this[`${vv}`])
    params.unsubscribe(topic)
  })
}
//getDatamqtt(client, 'sensor/Hum', 'payl_hum')
getDatamqtt(client, 'sensor/Tem', 'payl')

/* client.on("connect", () => {
  console.log("Connected");
});

setInterval(() => {
  client.subscribe("sensor/Temp", () => {
    console.log(`Subscribe to topic `);
  });
}, 10000);
client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  payl = payload.toString();
  client.unsubscribe("sensor/Temp", () => {
    console.log("unsubscribe");
  });
}); */
//===========client 2 ================
/* client2.on("connect", () => {
  console.log("Connected");
});

setInterval(() => {
  client2.subscribe("sensor/Hum", () => {
    console.log(`Subscribe to topic `);
  });
}, 10000);
client2.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  Hum = payload.toString();
  client2.unsubscribe("sensor/Hum", () => {
    console.log("unsubscribe");
  });
}); */

router.get('/temp', async (req, res) => {
  //res.json({ temp: payl || 0 })
  const _id = '6396623e7e1ca1a384eb295f'
  try {
    const brokerDB = await BrokerSchema.findById({ _id })
    brokerDB.temp.push(payl)
    await brokerDB.save()
    res.json({ temp: payl || 0 })
  } catch (error) {
    res.status(404).json({ msg: 'something wrong happening' })
  }
})
/* router.get('/hum', async (req, res) => {
  res.json({ hum: payl_hum || 0 })
}) */
module.exports = router
