const express = require('express');
const router = express.Router();
const LoginController = require('../bookshop_controllers/Register.js');

router.post('/', LoginController.handleNewUser);
module.exports = router;