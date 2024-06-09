const express = require('express');
const router = express.Router();
const Class = require('../controllers/Class.Controller.js');
const Middleware = require('../middleware/index.js');

router.post('/createClass', Middleware, Class.createClass)
router.post('/getListClass', Middleware, Class.getListClass)
router.post('/getDetailClass', Middleware, Class.getDetailClass)

module.exports = router