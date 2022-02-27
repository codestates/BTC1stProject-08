const express = require('express');
const transactionRouter = require('./trans/transactions');

const app = express();
app.use('/tx', transactionRouter);
module.exports = app;
