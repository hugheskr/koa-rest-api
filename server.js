const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = koa();

const PORT = process.env.PORT || 3000;


