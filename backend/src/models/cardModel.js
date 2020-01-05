const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    tasks: {
      type: [[String]],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('cardModel', cardSchema);
