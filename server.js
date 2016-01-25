const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = koa();

const PORT = process.env.PORT || 3000;
// Connect to DB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
// Require router
const movieRouter = require(__dirname + '/app/route');
// Set parsing Middleware
app.use(bodyParser());
// Set routing Middleware
app.use(movieRouter.routes());

// Start Server, shoutout to user
app.listen(PORT, () => {
	console.log('Server stared on port ' + PORT);
});


