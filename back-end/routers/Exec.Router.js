const express = require('express');
const router = express.Router();
const Exec = require('../controllers/Exec.Controller.js');
const Middleware = require('../middleware/index.js');

router.post('/:ID_Exercise', Middleware, Exec.executeCode)

module.exports = router