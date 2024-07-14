const express = require('express');
const router = express.Router();
const Class = require('../controllers/Class.Controller.js');
const Middleware = require('../middleware/index.js');

router.post('/createClass', Middleware, Class.createClass)
router.post('/getListClass', Middleware, Class.getListClass)
router.post('/getDetailClass', Middleware, Class.getDetailClass)
router.post('/createWork', Middleware, Class.createWork)
router.post('/updateWork', Middleware, Class.updateWork)
router.post('/deleteWork', Middleware, Class.deleteWork)
router.post('/getWork', Middleware, Class.getWork)
router.post('/requestJoinClass', Middleware, Class.requestJoinClass)
router.post('/getInfoClass', Middleware, Class.getInfoClass)
router.post('/acceptJoinClass', Middleware, Class.acceptJoinClass)
router.post('/cancelJoinClass', Middleware, Class.cancelJoinClass)
router.post('/deleteJoinClass', Middleware, Class.deleteJoinClass)
router.post('/getDetailWork', Middleware, Class.getDetailWork)

router.post('/getListStudentDoExcercise', Middleware, Class.getListStudentDoExcercise)
router.post('/chamDiem', Middleware, Class.chamDiem)

module.exports = router