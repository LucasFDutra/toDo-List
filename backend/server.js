const express = require('express');
const mongoose = require('mongoose');
const mongoUrl = require('./credentials.json');
const routes = require('./src/routes')

const app = express();

mongoose.connect(
  mongoUrl.mongoUrl,
  {
    useNewUrlParser: true
  }
)

app.use(express.json());
app.use('/api', routes);

app.listen(3001);
