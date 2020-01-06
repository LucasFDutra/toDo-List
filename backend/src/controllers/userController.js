const userModel = require('../models/userModel');

module.exports = {
  async loadAllUsers(req, res) {
    const { masterUser } = req.body;
    const { masterPassword } = req.body;

    if (masterUser === 'muly' && masterPassword === 123) {
      const users = await userModel.find();
      return res.json(users);
    }
    return res.json('You do not have authorization!');
  },

  async createNewUser(req, res) {
    const { username } = req.body;
    const { password } = req.body;

    if (username !== '' && password !== '') {
      let newUser = await userModel.findOne({ username });

      if (!newUser) {
        newUser = await userModel.create(req.body);
      } else {
        return res.send('402'); // existing user
      }
      return res.send('200'); // successfuly created
    }
    return res.send('403'); // insufficient data
  },

  async loginUser(req, res) {
    const { username } = req.headers;
    const { password } = req.headers;

    if (username !== '' && password !== '') {
      const user = await userModel.findOne({ username });

      if (!user) {
        return res.send('400'); // user not found
      }
      if (user.password === password) {
        return res.send('200'); // user authorized
      }
      return res.send('401'); // incorrect password
    }
    return res.send('403'); // insufficient data
  },

  async updateUser(req, res) {
    const { username } = req.params;
    const { oldPassword } = req.body;
    const { newPassword } = req.body;

    const user = await userModel.findOne({ username });

    if (user) {
      if (user.password === oldPassword) {
        await userModel.findOneAndUpdate({ username }, { password: newPassword }, { new: true });

        return res.send('200'); // successfully update
      }
      return res.send('401'); // incorrect password
    }
    return res.send('400'); // user not found
  },

  async deleteUser(req, res) {
    const { username } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({ username });

    if (user) {
      if (user.password === password) {
        await userModel.findOneAndRemove({ username });
        return res.send('200'); // successfully removed
      }
      return res.send('401'); // incorrect password
    }
    return res.send('400'); // user not found
  },
};
