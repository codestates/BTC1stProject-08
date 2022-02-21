const express = require('express');
const mysql = require('mysql');
const userRouter = require('./user/users');

const app = express();

app.use('/users', userRouter);

module.exports = app;
