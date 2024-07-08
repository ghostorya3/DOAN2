const express = require('express');
const router = express.Router();
const Class = require('../controllers/Class.Controller.js');
const Middleware = require('../middleware/index.js');

router.post('/createClass', Middleware, Class.createClass)
router.post('/getListClass', Middleware, Class.getListClass)
router.post('/getDetailClass', Middleware, Class.getDetailClass)
router.post('/createWork', Middleware, Class.createWork)
router.post('/getWork', Middleware, Class.getWork)
router.post('/requestJoinClass', Middleware, Class.requestJoinClass)
router.post('/getInfoClass', Middleware, Class.getInfoClass)

module.exports = router