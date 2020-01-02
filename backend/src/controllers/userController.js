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
    } else {
      return res.send('402'); // existing user
    }

    return res.json(newUser);
  },

  async loginConfirm(req, res) {
    const { username } = req.params;
    const { password } = req.headers;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.send('400'); // user not found
    }
    if (user.password === password) {
      return res.send('0');
    }
    return res.send('401'); // incorrect password
  },

  async show(req, res) {
    const { username } = req.params;
    const { password } = req.headers;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.send('400'); // user not found
    }
    if (user.password === password) {
      return res.json(user);
    }
    return res.send('401'); // incorrect password
  },

  async update(req, res) {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(user);
  },

  async destroy(req, res) {
    await userModel.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
