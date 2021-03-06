const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoUrl = require('./credentials.json');
const routes = require('./src/routes');

const app = express();

mongoose.connect(
  mongoUrl.mongoUrl,
  {
    useNewUrlParser: true,
  },
);

app.use(express.json());

app.use(cors());

app.use('/api', routes);

app.listen(3001);
