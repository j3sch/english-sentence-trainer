const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  textToTranslate: {
    type: String,
  },
  translatedText: {
    type: String,
  },
  translationResult: {
    type: String,
  },
  letterEqual: {
    type: Array,
  },
})

module.exports = mongoose.model('Exercise', ExerciseSchema)
