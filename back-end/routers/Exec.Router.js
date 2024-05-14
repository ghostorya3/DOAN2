const express = require('express');
const router = express.Router();
const Exec = require('../controllers/Exec.Controller.js');

router.post('/executeCode', Exec.executeCode)

module.exports = router