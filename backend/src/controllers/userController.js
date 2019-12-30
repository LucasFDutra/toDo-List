const mongoose = require('mongoose');
const userModel = require('../models/userModel');

module.exports = {
  async index(req, res) {
    const users = await userModel.find();

    return res.json(users);
  },

  async store(req, res) {

    const { username } = req.body;

    let newUser = await userModel.findOne({ username });

    if (!newUser) {
      newUser = await userModel.create(req.body);
      console.log('aqui');
    }

    return res.json(newUser);
  },

  async show(req, res) {
    const user = await userModel.findById(req.params.id);

    return res.json(user);
  },

  async update(req, res) {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(user)
  },

  async destroy(req, res) {
    await userModel.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
