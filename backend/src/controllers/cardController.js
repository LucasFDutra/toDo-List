const cardModel = require('../models/cardModel');
const userModel = require('../models/userModel');

const userValidation = async (username, password) => {
  const user = await userModel.findOne({ username });
  if (user) {
    if (user.password === password) {
      return (true);
    }
  }
  return (false);
};

module.exports = {
  async loadAllCards(req, res) {
    const { username } = req.params;
    const { password } = req.headers;
    const { label } = req.headers;

    const validation = await userValidation(username, password);

    if (validation) {
      let cards = '';
      if (label !== '') {
        cards = await cardModel.find({ username, label });
      } else {
        cards = await cardModel.find({ username });
      }
      return res.json(cards);
    }
    return res.send('404'); // access denied
  },

  async createNewCard(req, res) {
    const { username } = req.body.validationInfo;
    const { password } = req.body.validationInfo;

    const validation = await userValidation(username, password);

    if (validation) {
      await cardModel.create(req.body.data);
      return res.send('200'); // successfully created
    }
    return res.send('404'); // access denied
  },

  async updateCard(req, res) {
    const { username } = req.body.validationInfo;
    const { password } = req.body.validationInfo;

    const validation = await userValidation(username, password);

    if (validation) {
      const { _id } = req.params;

      await cardModel.findByIdAndUpdate(_id, req.body.data, { new: true });
      return res.send('200'); // successfully updated
    }
    return res.send('404'); // access denied
  },

  async deleteCard(req, res) {
    const { username } = req.body;
    const { password } = req.body;

    const validation = await userValidation(username, password);

    if (validation) {
      const { _id } = req.params;

      await cardModel.findByIdAndRemove(_id);
      return res.send('200'); // successfully deleted
    }
    return res.send('404'); // access denied
  },
};
