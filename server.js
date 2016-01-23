const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = koa();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:3000/db');

const movieRouter = require(__dirname + '/app/route');

app.use(movieRouter);

app.listen(PORT, () => {
	console.log('Server stared on port ' + PORT);
});


