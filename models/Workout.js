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
    duration: {
        type: Number, 
        min: [0, 'Negative number is not allowed']
    },
    weight: {
        type: Number, 
        min: [0, 'Negative number is not allowed']
    },
    reps: {
        type: Number,
        min: [0, 'Negative number is not allowed'],
        validate: {validator: Number.isInteger, message: '{VALUE} is not integer'}
    },
    sets: {
        type: Number, 
        min: [0, 'Negative number is not allowed'], 
        validate: {validator: Number.isInteger, message: '{VALUE} is not integer'}
    },
    distance: {
        type: Number, 
        min: [0, 'Negative number is not allowed']
    },
});

const workoutSchema = new Schema({
    day: Date, 
    exercises: [ExcerciseSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);
