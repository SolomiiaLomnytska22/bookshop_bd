const express = require('express');
const router = express.Router();
const LoginController = require('../bookshop_controllers/Login.js');

router.post('/', LoginController.handleLogin);
module.exports = router;