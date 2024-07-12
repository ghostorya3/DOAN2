const userRouter = require('./User.Router')
const express = require('express');
const router = express.Router();
const excecRouter = require('./Exec.Router');
const classRouter = require('./Class.Router');

router.use('/user', userRouter);
router.use('/exec', excecRouter);
router.use('/class', classRouter);

module.exports = router;