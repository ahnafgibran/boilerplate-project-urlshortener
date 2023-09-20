const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  seq: Number
});

module.exports = mongoose.model("Counter", counterSchema);