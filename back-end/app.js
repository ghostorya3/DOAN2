const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/classroom');
conn.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})