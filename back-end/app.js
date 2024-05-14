const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./routers');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/classroom');
// conn.on('connected', () => {
//   console.log('Connected to MongoDB');
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})