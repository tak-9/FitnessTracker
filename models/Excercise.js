const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
});

const Excercise = mongoose.model('Excercise', ExcerciseSchema); 

module.exports = Excercise;