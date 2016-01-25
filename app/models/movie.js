const mongoose = require('mongoose');

// Movie Schema
var movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  date: {type: Number},
  director: {type: String},
  actors: {type: Array}
});

module.exports = exports = mongoose.model('Movie', movieSchema);
