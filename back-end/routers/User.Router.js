const express = require('express');
const router = express.Router();
const User = require('../controllers/User.Controller.js');

router.post('/login', User.login);

module.exports = router