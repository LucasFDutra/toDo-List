const express = require('express');
const routes = express.Router();

const userController = require('./controllers/userController');

routes.get('/user', userController.index);
routes.post('/user', userController.store);
routes.get('/user/:id', userController.show);
routes.put('/user/:id', userController.update);
routes.delete('/user/:id', userController.destroy);

module.exports = routes;
