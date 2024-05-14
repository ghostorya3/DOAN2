const userRouter = require('./User.Router')
const express = require('express');
const router = express.Router();
const excecRouter = require('./Exec.Router');



router.use('/user', userRouter);
router.use('/exec', excecRouter);

module.exports = router;