const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const cardsSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    tasks: {
      type: [[String]],
      required: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = module('cardModel', cardsSchema);
