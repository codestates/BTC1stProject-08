const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const config = require('./config/key');

const indexRouter = require('./routes/index');

const app = express();

const connection = mysql.createConnection({
    host: config.mysql_URI.host, // 호스트 주소
    port: config.mysql_URI.port, // port
    user: config.mysql_URI.user, // mysql user
    password: config.mysql_URI.password, // mysql password
    database: config.mysql_URI.database, // mysql 데이터베이스
  });

connection.connect((err) => {
    if (err) {
      console.error('mysql error connecting: ', err.stack);
      return;
    }
    console.log('mysql connected as id ', connection.threadId);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
