const express = require('express');
const router = express.Router();
const LoginController = require('../bookshop_controllers/Logout.js');

router.get('/', LoginController.handleLogout);

module.exports = router;