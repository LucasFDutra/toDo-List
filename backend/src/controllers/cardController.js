const mongoose = require('mongoose');
const cardModel = require('../models/cardModel');

module.exports = {
  async loadAllCards(req, res) {
    const cards = await cardModel.find();
    return res.json(cards);
  },

  async createNewCard(req, res) {
    const newCard = await cardModel.create(req.body);

    return res.json(newCard);
  },

  async updateCard(req, res){
    const { _id } = req.params;

    const card = await cardModel.findByIdAndUpdate(_id, req.body, { new: true });

    return res.json(card)
  },

  async deleteCard(req, res){
    const { _id } = req.params;

    await cardModel.findByIdAndRemove(_id);
  }
};
