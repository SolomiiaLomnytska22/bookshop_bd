const express = require('express');
const router = express.Router();
const refreshTokenController = require('../bookshop_controllers/RefreshToken.js');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;