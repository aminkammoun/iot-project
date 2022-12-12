const mongoose = require('mongoose')

const BrokerSchema = mongoose.Schema({
  temp: [{ type: Number, required: true }],
})

module.exports = mongoose.model('brokerSchema', BrokerSchema)
