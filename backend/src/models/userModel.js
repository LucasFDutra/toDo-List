const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

var cardSchema = new Schema(
  {
    label: String,
    title: String,
    task: [String]
  }
)

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    cards: {
      type: [cardSchema],
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('userModel', userSchema)
