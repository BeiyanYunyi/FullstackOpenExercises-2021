const express = require('express');
const morgan = require('morgan');
require('express-async-errors');

const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use('/api/blogs', blogsRouter);

module.exports = app;
