const router = require('koa-router')();
const mongoose = require('mongoose');
const Movie = require(__dirname + '/models/movie');


module.exports = exports = router
// Get all Movies
.get('/movie', function * () {
  this.body = yield Movie.find({});
})
// Post one Movie (Unique Titles Only)
.post('/movie', function * () {
  var exists = yield Movie.findOne({
    title: this.request.body.title
  });
  if (exists === undefined) {
    var newMovie = new Movie(this.request.body);
    var inserted = yield newMovie.save();
    this.body = inserted;
  } else {
    this.body = "An event with that name already exists";
  }
})
// Update movie based on title
.put('/movie/:title', function * () {
  var newData = this.request.body;
  delete newData._id;
  var updated = yield Movie.update({
    title: this.params.title
  });
  upated = 'Successful PUT';
  this.body = updated;
})
// Delete Movie based on title
.delete('/movie/:title', function * () {
  var deleted = yield Movie.remove({
    title: this.params.title
  });
  deleted = 'Successful DELETE';
  this.body = deleted;
});