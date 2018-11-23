var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var comRouter = require('./routes/com');
//routes end

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/game', gamesRouter);
app.use('/com', comRouter);

//module.exports = app;
var port = 80;
//process.env.SERVER_PORT
app.listen(port, function () {
    console.log('Example app listening on port 80!');
});
