'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/test/testDb';
const server = require(__dirname + '/../server'); //eslint-disable-line
const Movie = require(__dirname + '/../app/models/movie');

describe('The Movie API', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });

  });

  it('POST should create a movie with a post', (done) => {
    chai.request('localhost:3000')
      .post('/movie')
      .send({
        title: 'a trial movie',
        genre: 'drama'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('genre');
        done();
      });
  });

  describe('Requests that must have a movie in the db', () => {

    beforeEach((done) => {
      Movie.create({
        title: 'test movie',
        genre: 'test genre'
      }, (err, data) => { //eslint-disable-line
        this.testMovie = data;
        done();
      });
    });

    it('GET should be able to retreive our movies', (done) => {
      chai.request('localhost:3000')
        .get('/movie')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });
    it('PUT should be able to update a movie', (done) => {
      chai.request('localhost:3000')
        .put('/movie/' + this.testMovie.title)
        .send({
          title: 'new movie title',
          genre: 'new genre type'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successful PUT');
          done();
        });
    });

    it('DELETE should be able to delete a movie', (done) => {
      chai.request('localhost:3000')
        .delete('/movie/' + this.testMovie.title)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Successful DELETE');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
