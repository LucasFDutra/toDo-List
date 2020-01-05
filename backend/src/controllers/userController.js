const mongoose = require('mongoose');
const userModel = require('../models/userModel');

module.exports = {
  async loadAllUsers(req, res) {
    const users = await userModel.find();
    return res.json(users);
  },

  async createNewUser(req, res) {
    const { username } = req.body;

    let newUser = await userModel.findOne({ username });

    if (!newUser) {
      newUser = await userModel.create(req.body);
    } else {
      return res.send('402'); // existing user
    }

    return res.json(newUser);
  },

  async loginUser(req, res) {
    const { username } = req.body;
    const { password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.send('400'); // user not found
    }
    if (user.password === password) {
      return res.send('0'); // user authorized
    }
    return res.send('401'); // incorrect password
  },

  async updateUser(req, res) {
    const { username } = req.params;

    const user = await userModel.findOneAndUpdate({ username }, req.body, {new: true})

    return res.json(user);
  },

  async deleteUser(req, res) {
    const { username } = req.params;

    await userModel.findOneAndRemove({ username });

    return res.send();
  },
};
