const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

var cardSchema = new Schema(
  {
    label: String,
    title: String,
    task: [[String, Boolean]]
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
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('userModel', userSchema)
