const express = require('express');
const router = express.Router();
const Exec = require('../controllers/Exec.Controller.js');
const Middleware = require('../middleware/index.js');

router.post('/executeCode', Middleware, Exec.executeCode)
router.post('/submitCode', Middleware, Exec.submitCode)

module.exports = router