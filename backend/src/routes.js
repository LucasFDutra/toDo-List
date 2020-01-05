const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');
const cardController = require('./controllers/cardController');

routes.get('/user/loadAllUsers', userController.loadAllUsers);
routes.post('/user/createNewUser', userController.createNewUser);
routes.get('/user/loginUser', userController.loginUser);
routes.put('/user/updateUser/:username', userController.updateUser);
routes.delete('/user/deleteUser/:username', userController.deleteUser);

routes.get('/card/loadAllCards/:username', cardController.loadAllCards);
routes.post('/card/createNewCard', cardController.createNewCard);
routes.put('/card/updateCard/:_id', cardController.updateCard);
routes.delete('/card/deleteCard/:_id', cardController.deleteCard);

module.exports = routes;
