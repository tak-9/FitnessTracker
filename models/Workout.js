const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
const workoutSchema = new Schema({
    day: {
        type: Date,
        unique: true
    },
    exercises: [
        {
          type: Schema.Types.ObjectId,
          ref: "Excercise"
        }
      ]
});
*/
/*
const workoutSchema = new Schema({
    day: Date, 
    exercises: [{
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
  }]
});
*/

const ExcerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
});

const workoutSchema = new Schema({
    day: Date, 
    exercises: [ExcerciseSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);
